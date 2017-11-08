var express = require('express');
	app = express();
	server = require('http').createServer(app);
	io = require('socket.io').listen(server)
	voteo = new Array();
	
var mime_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};

var mysql = require('mysql');

server.listen(4000, function(){
	var addr = server.address();
	console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

var pool      =    mysql.createPool({
    connectionLimit : 1000, //important
    host     : 'localhost',
    user     : 'root', /*root*/
    password : 'root', /*progra*/
    database : 'empaworld', /*empaworld*/
    port     :  8889,
    debug    :  false
}); 

var selecciono  = function (sql,info,callback) {
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          callback(false);
          return;
        }
    connection.query(sql,info,function(err,rows){
            connection.release();
            if(!err) {
              callback(rows);
            }else {
            	console.log(err);
            }
        });
     connection.on('error', function(err) {
              callback(false);
              return;
        });
    });
}
var guardo  = function (sql,info,callback) {
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          callback(false);
          return;
        }

    connection.query(sql,info,function(err,rows){
            connection.release();
            if(!err) {
              callback(rows);
            }else {
            	console.log(err);
            }
        });
     connection.on('error', function(err) {
              callback(false);
              return;
        });
    });
}

app.get('/',function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/dashboard',function(req, res){
	res.sendFile(__dirname+'/panel.html');
});

app.get('/votacion_1',function(req, res){
	res.sendFile(__dirname+'/voteo-1.html');
});

app.get('/votacion_2',function(req, res){
	res.sendFile(__dirname+'/voteo-2.html');
});

app.get('/votacion_3',function(req, res){
	res.sendFile(__dirname+'/voteo-3.html');
});

app.get('/experto',function(req, res){
	res.sendFile(__dirname+'/experto.html');
});

app.get('/filtro',function(req, res){
	res.sendFile(__dirname+'/filtro.html');
});

app.get('/css/:estilo', function(req, res){
  var archivo=req.params.estilo;
  res.sendFile(__dirname + '/css/'+archivo);
});

app.get('/js/:archivo', function(req, res){
  var archivo=req.params.archivo;
  res.sendFile(__dirname + '/js/'+archivo);
});

app.get('/img/:carpeta/:img', function(req, res){
	var imagen=req.params.img,
		carpeta=req.params.carpeta;
  res.sendFile(__dirname + '/img/'+carpeta+'/'+imagen);
});

app.get('/fonts/:fuente', function(req, res){
	var fuente=req.params.fuente;
  res.sendFile(__dirname + '/fonts/'+fuente);
});

io.sockets.on('connection', function(socket){
	socket.setMaxListeners(20);
	
	socket.on('checosihay',function(){
		sql="SELECT vp.idvoto_pregunta,vp.nombre,vr.idvoto_respuesta,vr.opcion FROM voto_pregunta vp inner join voto_respuesta vr on vr.idvoto_pregunta=vp.idvoto_pregunta where estado=1";
		//console.log(sql);
		selecciono(sql,"",function(res){
			//console.log("selecciono pregunta: "+data.op);
			if(res.length>0){
				socket.emit('hay voteo', {op: true,opp:2,infos:res,yavoto:false});
			}
			
		})
	});
	
	socket.on('mando voteo', function(data,callback){
		//ESTE IF ES PARA MANDAR LA VOTACION		
		if (data.estado=="1") {
			var sql="update voto_pregunta set estado=? and idvoto_pregunta=?";
			var info=new Array(data.estado,data.ide);
			guardo(sql,info,function(){
				sql="SELECT vp.idvoto_pregunta,vp.nombre,vr.idvoto_respuesta,vr.opcion FROM voto_pregunta vp inner join voto_respuesta vr on vr.idvoto_pregunta=vp.idvoto_pregunta where estado=1 and vp.idvoto_pregunta=?";
				//console.log(sql);
				selecciono(sql,data.ide,function(res){
					//console.log("selecciono pregunta: "+data.op);
					io.sockets.emit('hay voteo', {op: data.op,breakout: data.breakout,opp:data.opp,infos:res,yavoto:false});
				});
			});
		}else if (data.estado=="0") { // ESTE OTRO IF ES PARA CERRAR LA VOTACION
			var sql="update voto_pregunta set estado=? and idvoto_pregunta=?";
			//console.log("cancelo: "+data.estado+" "+data.ide);
			var info=new Array(data.estado,data.ide);
			guardo(sql,info,function(){

					//console.log("cancelo pregunta: "+data.op);
					io.sockets.emit('hay voteo', {op: data.op, breakout: data.breakout, opp:data.opp,yavoto:false});
				
			});
		}	
	});

	socket.on('mando alerta', function(data,callback){
		io.sockets.emit('hay alerta', {op: data.op,msg:data.msg,opp:data.opp,yavoto:false});
	});

	socket.on("pregunta live",function(data,callback){
		var sql="insert into tanger_live(comentario) values(?)";
		var info=new Array(data.pregunta);
		var respuesta=new Array();
		guardo(sql,info,function(res){
			if (res.affectedRows=="1") {
				respuesta["op"]=true;
				respuesta["msg"]="Gracias por su respuesta";
				callback(true);
				que_experto();
			}
		});
	});
	
	socket.on("add question", function( data, callback ) {
		var sql = "INSERT INTO voto_pregunta ( nombre, breakout) VALUES (?, ?)";
		var question = data["question"];
		var array = new Array();
		var centinel = 0;

		guardo(sql, question, function( res ){
			if( res.affectedRows == "1" ) {
				var sql = "SELECT MAX(idvoto_pregunta) AS id FROM voto_pregunta";
				
				selecciono( sql,"" ,function(res) {
					var id = res[0].id;
					var sql = "INSERT INTO voto_respuesta ( idvoto_pregunta, opcion ) VALUES (?, ?)";

					for(var i = 0; i < data.answers.length; i++) {
						array = [id, data.answers[i]];

						guardo(sql,array, function( res ){});
					}

					callback(true);
				});
			}else {
				callback(false);
			}
		});

	});


	socket.on("save survey", function( data, callback ) {
		var sql = "INSERT INTO surveys (name, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		var dataSource = data["data"];

		guardo(sql, dataSource, function( res ){
			if( res.affectedRows == "1" ) {
				callback(true);
			}else {
				callback(false);
			}
		});
	});

	socket.on('voto',function(datas){
		var data=datas.ide;
		var otro=data.split("-");
		var pregunta=datas.pregunta;
		var user=datas.user;
		var voto = {};
		var miarray=new Array();
		
		var sql='insert into voto_respondieron(idvoto_pregunta,idrespuesta) values(?,?)';
		var info=new Array(pregunta,otro[1]);
		//console.log("votan");
		guardo(sql,info,function(res){
			//console.log(res);
			
			if (res.affectedRows=="1") {
				/**///var sql="SELECT * from voto_usuario where idvoto_pregunta=?";
				var sql="SELECT * from voto_respondieron where idvoto_pregunta=?";
				//console.log(sql+" "+pregunta);
				selecciono(sql,pregunta,function(res){
					console.log(res);
					for (var i = 0,p=1; i < res.length; i++,p++) {
						var algo="u-"+res[i].idrespuesta;
						// console.log(algo);
						if (algo in voto) {
							var q=voto[algo];
							q++;
							voto[algo]=q;
							voteo[algo]=q;
						}else{
							voteo[algo]=1;
							voto[algo]=1;
						}
						// console.log(voto);
						//voto["u-"+res[0].idrespuesta]=p;
					}
					//console.log(voto);

					io.sockets.emit("calculando", voto);
				});
			}
			
		});
	});

	socket.on('reloadApp',function () {
		console.log('tengo que reload desde server');
		io.sockets.emit('reloadAllApp');
	});
	
	socket.on('updateexperto',function (data) {
		var div=data.split("-");
		var id = div[0];
		var state = parseInt(div[1]);
		var state2 = state = !state;
		var sql="update tanger_live set estado=? where idtanger_live=?";
		
		var info=new Array(state2, id);
		guardo(sql,info,function(response){
			console.log(response);
			que_experto();
		});
	});

	que_voteo();
	function que_voteo(){
		var sql="select * from voto_pregunta";
		selecciono(sql,"",function(res){
			socket.emit("que voteo",res,function(callback){});
		});
	}

	que_experto();
	function que_experto(){
		console.log("saco preguntas");
		var sql="select * from tanger_live order by idtanger_live desc";
		selecciono(sql,"",function(res){
			io.sockets.emit("experto",res);
		});
	}		
});
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
	res.sendFile(__dirname+'/juego.html');
});

app.get('/alertas',function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/voteo',function(req, res){
	res.sendFile(__dirname+'/voteo.html');
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
			if (data.estado=="1") {
				var sql="update voto_pregunta set estado=? and idvoto_pregunta=?";
				var info=new Array(data.estado,data.ide);
				guardo(sql,info,function(){
					sql="SELECT vp.idvoto_pregunta,vp.nombre,vr.idvoto_respuesta,vr.opcion FROM voto_pregunta vp inner join voto_respuesta vr on vr.idvoto_pregunta=vp.idvoto_pregunta where estado=1 and vp.idvoto_pregunta=?";
					
					selecciono(sql,data.ide,function(res){					
						io.sockets.emit('hay voteo', {op: data.op,opp:data.opp,infos:res,yavoto:false});
					});
				});
			}else
			if (data.estado=="0") {
				var sql="update voto_pregunta set estado=? and idvoto_pregunta=?";
				
				var info=new Array(data.estado,data.ide);
				
				guardo(sql,info,function(){
					io.sockets.emit('hay voteo', {op: data.op,opp:data.opp,yavoto:false});					
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
						console.log(algo);
						if (algo in voto) {
							var q=voto[algo];
							q++;
							voto[algo]=q;
							voteo[algo]=q;
						}else{
							voteo[algo]=1;
							voto[algo]=1;
						}
						console.log(voto);
						//voto["u-"+res[0].idrespuesta]=p;
					}
					//console.log(voto);

					io.sockets.emit("calculando", voto);
				});
			}
			
		});
	});

	socket.on("guardo encuesta",function(data,callback){
		var info=data["datos"];
		var num=Math.random();
		for (var i = 0,ques=1; i < info.length; i++,ques++) {
			var sql="insert into encuesta_respondio(idencuesta_pregunta,nombre,opcion) values(?,?,?)";
			var mirespuesta=info[i];
			if (i==0 && info[i]=='6') {
				mirespuesta=data["otro"];
			};
			var info2=new Array(ques,num,mirespuesta);
			guardo(sql,info2,function(res){		
				if (res.affectedRows=="1") {
					callback(true);
				}
			});
		};
		var sql="insert into encuesta_respondio(idencuesta_pregunta,nombre,opcion) values()";
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
		//console.log("cancelo: "+data.estado+" "+data.ide);
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
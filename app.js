var express = require('express');
	app = express();
	server = require('http').createServer(app);
	io = require('socket.io').listen(server),
	//mongoose = require('mongoose'),
	users = {},
	//voto = {},
	voteo = new Array();
var mime_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};
var usuarios=new Array();
var posicion=new Array();
var mysql = require('mysql');
server.listen(4000, function(){
	var addr = server.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

var pool      =    mysql.createPool({
    connectionLimit : 1000, //important
    host     : 'localhost',
    user     : 'progra', /*progra*/
    password : 'progra', /*progra*/
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
        ////console.log(info);
    connection.query(sql,info,function(err,rows){
            connection.release();
            if(!err) {
              callback(rows);
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
app.get('/voto',function(req, res){
	res.sendFile(__dirname+'/voto.html');
});
app.get('/live',function(req, res){
	res.sendFile(__dirname+'/live.html');
});
app.get('/encuesta',function(req, res){
	res.sendFile(__dirname+'/encuesta.html');
});
app.get('/experto',function(req, res){
	res.sendFile(__dirname+'/experto.html');
});
app.get('/filtro',function(req, res){
	res.sendFile(__dirname+'/filtro.html');
});
app.get('/grupos/:grupo/:diapo', function(req, res){
	var grupo=req.params.grupo;
	var diapo=req.params.diapo;
  res.sendFile(__dirname + '/grupos/'+grupo+'/'+diapo);
});
app.get('/grupos/:grupo/:diapo/:dia', function(req, res){
	var grupo=req.params.grupo;
	var diapo=req.params.diapo;
	var dia=req.params.dia;
  res.sendFile(__dirname + '/grupos/'+grupo+'/'+diapo+'/'+dia);
});
app.get('/css/:estilo', function(req, res){
	var archivo=req.params.estilo;
  res.sendFile(__dirname + '/css/'+archivo);
});
app.get('/js/:archivo', function(req, res){
	var archivo=req.params.archivo;
  res.sendFile(__dirname + '/js/'+archivo);
});
app.get('/final/:carpeta', function(req, res){
	var imagen=req.params.img,
		carpeta=req.params.carpeta;
  res.sendFile(__dirname + '/final/'+carpeta);
});
app.get('/img/:carpeta/:img', function(req, res){
	var imagen=req.params.img,
		carpeta=req.params.carpeta;
  res.sendFile(__dirname + '/img/'+carpeta+'/'+imagen);
});
app.get('/img/:carpeta/:carpeta2/:img', function(req, res){
	var imagen=req.params.img,
		carpeta=req.params.carpeta,
		carpeta2=req.params.carpeta2;
  res.sendFile(__dirname + '/img/'+carpeta+'/'+carpeta2+'/'+imagen);
});
app.get('/fonts/:fuente', function(req, res){
	var fuente=req.params.fuente;
  res.sendFile(__dirname + '/fonts/'+fuente);
});

io.sockets.on('connection', function(socket){
	socket.setMaxListeners(20);
	socket.on('login',function(data,callback){
		var sql='SELECT * FROM usuarios where correo=? and password=?';
		var info=new Array(data.email,data.pass);
		selecciono(sql,info,function(res){
			//console.log(res);
			if (res.length>0) {
				var ide=res[0].idusuarios
				var gral=new Array(ide,res[0].correo);
				callback(gral);
				var sql="SELECT vp.idvoto_pregunta,vp.nombre,vr.idvoto_respuesta,vr.opcion FROM voto_pregunta vp inner join voto_respuesta vr on vr.idvoto_pregunta=vp.idvoto_pregunta where estado=1";
				selecciono(sql,"",function(res2){
					if (res2.length>0) {
						sql="select * from voto_usuario where idusuarios=? and idvoto_pregunta=?";
						////console.log(res2);
						var info3=new Array(ide,res2[0].idvoto_pregunta);
						selecciono(sql,info3,function(res3){
							//console.log("voy a ver si ya voto");
							//console.log(res3);
							if (res3.length>0) {
								//console.log("si voto");
								socket.emit('hay voteo', {op: true,msg:data.msg,opp:2,infos:res2,yavoto:true});
							}else{
								//console.log("no voto");
								socket.emit('hay voteo', {op: true,msg:data.msg,opp:2,infos:res2,yavoto:false});
							}
							
						});
						
					}
					sql="insert into login (idusuarios,fecha) values(?,NOW())";
					//console.log(sql+" "+ide);
					guardo(sql,ide,function(){

					});
				});
			}else{
				callback(false);
			}
			
		});
	});
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
		//console.log("que mando: "+data.estado);
			if (data.estado=="1") {
				var sql="update voto_pregunta set estado=? and idvoto_pregunta=?";
				var info=new Array(data.estado,data.ide);
				guardo(sql,info,function(){
					sql="SELECT vp.idvoto_pregunta,vp.nombre,vr.idvoto_respuesta,vr.opcion FROM voto_pregunta vp inner join voto_respuesta vr on vr.idvoto_pregunta=vp.idvoto_pregunta where estado=1 and vp.idvoto_pregunta=?";
					//console.log(sql);
					selecciono(sql,data.ide,function(res){
						//console.log("selecciono pregunta: "+data.op);

						io.sockets.emit('hay voteo', {op: data.op,opp:data.opp,infos:res,yavoto:false});
					});
				});
			}else
			if (data.estado=="0") {
				var sql="update voto_pregunta set estado=? and idvoto_pregunta=?";
				//console.log("cancelo: "+data.estado+" "+data.ide);
				var info=new Array(data.estado,data.ide);
				guardo(sql,info,function(){

						//console.log("cancelo pregunta: "+data.op);
						io.sockets.emit('hay voteo', {op: data.op,opp:data.opp,yavoto:false});
					
				});
			}
			
			

			
	});
	socket.on('mando alerta', function(data,callback){
			//console.log("se manda la alerta");
			io.sockets.emit('hay alerta', {op: data.op,msg:data.msg,opp:data.opp,yavoto:false});
	});

	socket.on('voto',function(datas){
		var data=datas.ide;
		var otro=data.split("-");
		var pregunta=datas.pregunta;
		var user=datas.user;
		var voto = {};
		var miarray=new Array();
		/*if (data in voto) {
			var q=voto[data];
			q++;
			voto[data]=q;
			voteo[data]=q;
		}else{
			voteo[data]=1;
			voto[data]=1;
		}*/
		//var sql='insert into voto_usuario(idvoto_pregunta,idusuarios,idrespuesta) values(?,?,?)';
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
		//io.sockets.emit("calculando", voto);
	});
	socket.on('finalizo voto',function(pregunta){
		var voto = {};
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
	});
	socket.on('voto2',function(datas){
		var voto = {};
		var sql="SELECT * from voto_respondieron where idvoto_pregunta=?";
		selecciono(sql,datas,function(res){
			//console.log(res);
			for (var i = 0,p=1; i < res.length; i++,p++) {
				voto["u-"+res[0].idrespuesta]=p;
			}
			io.sockets.emit("calculando", voto);
		});
		
	});
	socket.on("pregunta live",function(data,callback){
		//console.log("mando una pregunta");
		var sql="insert into tanger_live(idusuarios,comentario) values(?,?)";
		var info=new Array("1",data.pregunta);
		var respuesta=new Array();
		guardo(sql,info,function(res){
			//console.log(res);
			if (res.affectedRows=="1") {
				respuesta["op"]=true;
				respuesta["msg"]="Gracias por su respuesta";
				callback(true);
				que_experto();
			}
		});
	});
	socket.on("guardo nota",function(data,callback){
		if (data.actualizo=="0") {
			var sql="insert into notas(idusuarios,titulo,nota) values(?,?,?)";
			var info=new Array(data.user,data.nombre,data.comentario);
		}
		if (data.actualizo=="1") {
			var sql="update notas set titulo=?,nota=? where idusuarios=? and idnotas=?";
			var info=new Array(data.nombre,data.comentario,data.user,data.idenota);
		}
		
		var respuesta=new Array();
		guardo(sql,info,function(res){
			//console.log(res);
			if (res.affectedRows=="1") {
				callback(true);
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

	socket.on("guardo encuesta2",function(data,callback){
		//console.log(data["datos"]);
		//var info=data["datos"].split("&");
		var info=data["datos"];
		//console.log(info);
		var num=Math.random();
		for (var i = 0,ques=17; i < info.length; i++,ques++) {
			var sql="insert into encuesta_respondio(idencuesta_pregunta,nombre,opcion) values(?,?,?)";
			var info2=new Array(ques,num,info[i]);
			/**/guardo(sql,info2,function(res){
				//console.log(res);
				
				if (res.affectedRows=="1") {
					callback(true);
				}
			});
		};
		var sql="insert into encuesta_respondio(idencuesta_pregunta,nombre,opcion) values()";
		/*guardo(sql,info,function(res){
			//console.log(res);
			if (res.affectedRows=="1") {
				callback(true);
			}
		});*/
	});
	socket.on("guardo encuesta3",function(data,callback){
		console.log(data);
		console.log(data.length);
		var info=data.length;
		var num=Math.random();
		for (var i = 0,ques=49; i < info; i++,ques++) {
			var sql="insert into encuesta_respondio(idencuesta_pregunta,nombre,opcion) values(?,?,?)";
			var info2=new Array(ques,num,data[i]);
			guardo(sql,info2,function(res){
				//console.log(res);
				
				if (res.affectedRows=="1") {
					callback(true);
				}
			});
		};
		var sql="insert into encuesta_respondio(idencuesta_pregunta,nombre,opcion) values()";
		/*guardo(sql,info,function(res){
			//console.log(res);
			if (res.affectedRows=="1") {
				callback(true);
			}
		});*/
	});
	socket.on("borro nota",function(data,callback){
		var sql="delete from notas where idusuarios=? and idnotas=?";
		var info=new Array(data.user,data.idenota);
		guardo(sql,info,function(res){
			if (res.affectedRows=="1") {
				callback(true);
			}
		});
	});
	socket.on("listar notas",function(data,callback){
		var sql="SELECT * FROM notas where idusuarios=?";
		selecciono(sql,data,function(res){
			callback(res);
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
		//console.log("cancelo: "+data.estado+" "+data.ide);
		var info=new Array(state2, id);
		guardo(sql,info,function(response){
			console.log(response);
			que_experto();
				//console.log("cancelo pregunta: "+data.op);
				//io.sockets.emit('hay voteo', {op: data.op,opp:data.opp,yavoto:false});
			
		});
	});
	que_voteo();
	function que_voteo(){
		var sql="select * from voto_pregunta";
		selecciono(sql,"",function(res){
			socket.emit("que voteo",res,function(callback){
		
	});
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
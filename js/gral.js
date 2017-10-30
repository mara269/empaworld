jQuery(function($){
		$(".show-caso").click(function(){
			var ide=$(this).attr("id");
			$(".todas-pres").hide();
			$(".paginas").hide();
			$(".contiene-presentacion").show();
			$(".contiene-pre-"+ide).show();
			$(".pre-paginas-"+ide).hide();
			var encual=$("#pag-pre-"+ide).val();
			$(".pag-"+encual).show();
			$(".barra-menu").show();
			$("#visible-pre").val(ide);
			$(".idioma-int").hide();
		});
		$(".show-casoG").click(function(){
			var ide=$(this).attr("id");
			$(".todos-grup").hide();
			$(".paginas").hide();
			$(".contiene-preGrupo").show();
			$(".contiene-preG-"+ide).show();
			$(".pre-paginasG-"+ide).hide();
			var encual=$("#pag-preG-"+ide).val();
			$(".pagG-"+encual).show();
			$(".barra-menu").show();
			$("#visible-pre").val(ide);
			$(".idioma-int").hide();
		});
		$(".ir-home").hide();
		$(".btn-pregunta,.sub-pregunta-experto").click(function(){
			$(".fondo-negro").show();
			$(".tanger-live").show();
		});
		$(".btn-voto").click(function(){
			$(".fondo-negro").show();
			$(".contiene-pregunta").show();
		});
		var socket = io.connect();
		$(".ir-home,.btn-regreso-menu").click(function(){
			$(".paginas").hide();
			$(".pag-inicio").show();
			$(".barra-menu-top").hide();
			$(".barra-menu").hide();
		});
		$(".btn-back-presentacion").click(function(){
			$(".paginas").hide();
			$(".in-presentaciones").show();
			//$(".in-grupos").show();
		});
		$(".btn-back-grupo").click(function(){
			$(".paginas").hide();
			$(".in-grupos").show();
		});
		$(".btn-back-break").click(function(){
			$(".paginas").hide();
			$(".pag-inicio").show();
		});
		$(".btn-back-encuesta").click(function(){
			$(".paginas").hide();
			$(".in-encuestas").show();
			$(".btn-che").show();
			$(".btn-back-encuesta").hide();
			$(".muestro-encuestas").show();
			$(".encuestas-grales").hide();
			$(".encuestas-grales-1").hide();
			$(".chirikahua").show();
			$(".manita").hide();
		});
		$(".sub-menus").click(function(){
			$(".interiores").hide();
			var ide=$(this).attr("id");
			if (ide=='encuestas') {
				$(".chirikahua").show();
			};
			$(".pag-inicio").hide();
			$(".in-"+ide).show();
			$(".barra-menu-top").show();
			$(".btns-menu-top").removeClass("slideInDown");
			$(".btns-menu-top").removeClass("agrego-top");
			$(".btn-"+ide).addClass("agrego-top");
			$(".btn-"+ide).addClass("slideInDown");
		});
		$(".btns-menu-top").click(function(){
			$(".interiores").hide();
			var ide=$(this).attr("id");
			$(".btns-menu-top").removeClass("slideInDown");
			$(".btns-menu-top").removeClass("slideInUp");
			$(".btns-menu-top").each(function(){
				var i=$(this).position();
				var q=$(this).attr("id");
				if (i.top>0) {
					$(".btns-menu-top").removeClass("agrego-top");
					$(".bt"+q).addClass("slideInUp");
				}
			});
			$(".bt"+ide).addClass("agrego-top");
			$(".bt"+ide).addClass("slideInDown");
			$(".i"+ide).show();
			
		});
		$(".img-chic").click(function(){
			var ide=$(this).attr("id");
			$(".img-sedes").hide();
			$(".gde-"+ide).show();
		});
		$(".mis-caras").click(function(){
			$(".muestro-info-ponentes").show();	
			var ide=$(this).attr("id");
			$(".mini-"+ide).show();
			$(".fondo-infos").show();
		});
		$(".mis-caras2").click(function(){
			$(".muestro-info-ponentes2").show();
			var ide=$(this).attr("id");
			$(".mini-"+ide).show();
			$(".fondo-infos").show();
		});
		$(".mis-caras3 img").click(function(){
			$(".muestro-info-ponentes3").show();
			$(".mis-caras-minis3").hide();
			$(".mis-infos").hide();
			var ide=$(this).attr("id");
			$(".mini-"+ide).show();
			$(".infos-"+ide).show();
			$(".fondo-infos").show();
		});
		$(".btn-nacional").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-ponentes").hide();
			$(".in-ponentes3").hide();
			$(".in-ponentes2").show();
		});
		$(".btn-internacional").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-ponentes2").hide();
			$(".in-ponentes3").hide();
			$(".in-ponentes").show();
		});
		$(".btn-next-ponente").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-ponentes").hide();
			$(".in-ponentes2").show();
			$(".in-ponentes3").hide();
		});
		$(".btn-ante-ponente").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-ponentes").show();
			$(".in-ponentes2").hide();
			$(".in-ponentes3").hide();
		});
		$(".btn-next-ponente2").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-ponentes2").hide();
			$(".in-ponentes3").show();
		});
		$(".btn-ante-ponente2").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-ponentes2").show();
			$(".in-ponentes3").hide();
		});
		$(".btn-cierro-ponente").click(function(){
			$(".fondo-infos").hide();
			$(".muestro-info-ponentes").hide();
			$(".mis-caras-minis").hide();
			$(".muestro-info-ponentes2").hide();
			$(".mis-caras-minis2").hide();
			$(".muestro-info-ponentes3").hide();
			$(".mis-caras-minis3").hide();
			$(".mis-infos").hide();
		});
		$(".veo-grupo").click(function(){
			var ide=$(this).attr("id");
			$(".todos-grup").hide();
			$(".paginas").hide();
			$(".barra-menu-top").hide();
			$(".contiene-preGrupo").show();
			$(".todos-grup").hide();
			$(".contiene-preG-"+ide).show();
			$(".pre-paginasG-"+ide).hide();
			var encual=$("#pag-preG-"+ide).val();
			$(".pagG-"+encual).show();
			$(".barra-menu").show();
			$(".ir-home").hide();
			$("#visible-grupo").val(ide);
			//saco_img2(ide);
		});
		
		$(".pase-paginaG").touchwipe(
		{
		   wipeLeft: function() 
		   {
		   		var visible=$("#visible-grupo").val();
		        var pag=parseInt($("#pag-preG-"+visible).val());
		        var total=parseInt($("#total-preG-"+visible).val());
		        var siguiente=1;
	            siguiente+=pag;
	            if (siguiente<=total) {
	                $(".pre-paginasG-"+visible).hide();
	                $(".pagG-"+visible+"-"+siguiente).show();
	                $("#pag-preG-"+visible).val(siguiente);
	            }
		   
		    }, 
		    wipeRight: function() 
		    { 
		      	var visible=$("#visible-grupo").val();
		        var pag=parseInt($("#pag-preG-"+visible).val());
		        var total=parseInt($("#total-preG-"+visible).val());
		        var siguiente=1;
	            siguiente=pag-siguiente;
	            if (siguiente >=1) {
	                $(".pre-paginasG-"+visible).hide();
	                $(".pagG-"+visible+"-"+siguiente).show();
	                $("#pag-preG-"+visible).val(siguiente);
	                
	            }
		    },
		    min_move_x: 0,
		    min_move_y: 0,
		    preventDefaultEvents: true
		});
		$(".click-caras img").click(function(){
			$(".muestro-info-staff").show();
			$(".datos-staff-gral").hide();
			var ide=$(this).attr("id");
			$(".dato-"+ide).show();
			$(".btn-cierro-staff").show();
			$(".fondo-negro").show();
			//console.log(ide);
		});
		$(".click-caras2 img").click(function(){
			$(".muestro-info-staff2").show();
			$(".datos-staff-gral2").hide();
			var ide=$(this).attr("id");
			$(".dato-"+ide).show();
			$(".btn-cierro-staff").show();
			$(".fondo-negro").show();
			console.log(ide);
		});
		$(".click-caras3 img").click(function(){
			$(".muestro-info-staff3").show();
			$(".datos-staff-gral3").hide();
			var ide=$(this).attr("id");
			$(".dato-"+ide).show();
			$(".btn-cierro-staff").show();
			$(".fondo-negro").show();
			console.log(ide);
		});
		$(".btn-next-staff").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-staff").hide();
			$(".in-staff2").show();
			console.log("staff 2");
		});
		$(".btn-next-staff2").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-staff2").hide();
			$(".in-staff3").show();
			console.log("staff 3");
		});
		$(".btn-ante-staff").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-staff").show();
			$(".in-staff2").hide();
			console.log("staff 1");
		});
		$(".btn-ante-staff2").click(function(){
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".in-staff2").show();
			$(".in-staff3").hide();
			console.log("staff 2");
		});
		$(".btn-cierro-staff").click(function(){
			$(".muestro-info-staff").hide();
			$(".datos-staff-gral").hide();
			$(".muestro-info-staff2").hide();
			$(".datos-staff-gral2").hide();
			$(".muestro-info-staff3").hide();
			$(".datos-staff-gral3").hide();
			$(".btn-cierro-staff").hide();
			$(".fondo-negro").hide();
		});
		$(".btn-siguiente-pre").click(function(){
			$(".cont-pre-1").hide();
			$(".cont-pre-2").show();
			$(".btn-siguiente-pre").hide();
			$(".btn-anterior-pre").show();
		});
		$(".btn-anterior-pre").click(function(){
			$(".cont-pre-2").hide();
			$(".cont-pre-1").show();
			$(".btn-siguiente-pre").show();
			$(".btn-anterior-pre").hide();
		});
		$(".veo-pre").click(function(){
			var ide=$(this).attr("id");
			$(".todas-pres").hide();
			$(".paginas").hide();
			$(".barra-menu-top").hide();
			$(".contiene-presentacion").show();
			$(".todas-pres").hide();
			$(".contiene-pre-"+ide).show();
			$(".pre-paginas-"+ide).hide();
			var encual=$("#pag-pre-"+ide).val();
			$(".pag-"+encual).show();
			$(".barra-menu").show();
			$(".ir-home").hide();
			$("#visible-pre").val(ide);
			//saco_img2(ide);
		});
		
		$(".pase-pagina").touchwipe(
		{
		   wipeLeft: function() 
		   {
		   		var visible=$("#visible-pre").val();
		        var pag=parseInt($("#pag-pre-"+visible).val());
		        var total=parseInt($("#total-pre-"+visible).val());
		        var siguiente=1;
	            siguiente+=pag;
	            if (siguiente<=total) {
	                $(".pre-paginas-"+visible).hide();
	                $(".pag-"+visible+"-"+siguiente).show();
	                $("#pag-pre-"+visible).val(siguiente);
	            }
		   
		    }, 
		    wipeRight: function() 
		    { 
		      	var visible=$("#visible-pre").val();
		        var pag=parseInt($("#pag-pre-"+visible).val());
		        var total=parseInt($("#total-pre-"+visible).val());
		        var siguiente=1;
	            siguiente=pag-siguiente;
	            if (siguiente >=1) {
	                $(".pre-paginas-"+visible).hide();
	                $(".pag-"+visible+"-"+siguiente).show();
	                $("#pag-pre-"+visible).val(siguiente);
	                
	            }
		    },
		    min_move_x: 0,
		    min_move_y: 0,
		    preventDefaultEvents: true
		});
		$(".btn-menu").click(function(){
			$(".paginas").hide();
			$(".barra-menu-top").show();
			$(".in-presentaciones").show();
			$(".barra-menu").hide();
			$(".ir-home").show();
		});
		$(".btn-encuestas").click(function(){
			$(".todas-pres").hide();
			$(".paginas").hide();
			$(".in-encuestas").show();
			$(".encuestas-grales").hide();
			$(".muestro-encuestas").show();
		});
		$(".muestro-encuestas").click(function(){
			$(".chirikahua").hide();
			$(".btn-che").hide();
			$(".btn-back-encuesta").show();
			var ide=$(this).attr("id");
			$(".muestro-encuestas").hide();
			$(".encuesta-"+ide).show();
			$(".manita").show();
		});
		$(".cierro-voto").click(function(){
			$(".contiene-pregunta").hide();
			$(".fondo-negro").hide();
		});
		$(".cierro-live").click(function(){
			$(".tanger-live").hide();
			$(".fondo-negro").hide();
		});
		$(".show-live").click(function(){
			$(".tanger-live").show();
			$(".fondo-negro").show();
		});
		$(".btn-envio-pregunta").click(function(){
			envio_pregunta();
		});
		$(".show-notas").click(function(){
			$(".muestro-notas").show();
			$(".fondo-negro").show();
		});
		$(".cierro-notas").click(function(){
			$(".muestro-notas").hide();
			$(".fondo-negro").hide();
		});
		$(".btn-guardo-nota").click(function(){
			guardo_nota();
		});
		socket.on("hay alerta",function(data){
			if (data.op) {
					//$(".muestro_voteo").hide();
					$(".fondo-negro").show();
					$(".txt-alerta").html(data.msg);
					$("#notificacion").show();
					setTimeout(function(){
						$(".fondo-negro").hide();
						$("#notificacion").hide();
						$(".txt-alerta").html('');
					},8000);
				}else{
					$(".fondo-negro").hide();
					$("#notificacion").hide();
					$(".txt-alerta").html('');
				}
		});
		socket.on("hay voteo", function(data){
			console.log("hay voteo");
			console.log(data);
			if (data.opp=="1") {
				if (data.op) {
					//$(".muestro_voteo").hide();
					$(".fondo-negro").show();
					$(".txt-alerta").html(data.msg);
					$("#notificacion").show();
					setTimeout(function(){
						$(".fondo-negro").hide();
						$("#notificacion").hide();
						$(".txt-alerta").html('');
					},8000);
				}else{
					$(".fondo-negro").hide();
					$("#notificacion").hide();
					$(".txt-alerta").html('');
				}
			}else
			if (data.opp=="2") {
				$(".gracias").hide();
				if (data.op) {

					var pregunta="";
					var idepregunta="";
					var yavotos=data.yavoto;
					$(".respuestas").html('');
					$(".fondo-negro").show();
					$(".contiene-pregunta").show();
					for (var i = 0; i < data.infos.length; i++) {
						pregunta=data.infos[0].nombre;
						idepregunta=data.infos[0].idvoto_pregunta;
						$(".respuestas").append('<div class="row preguntas-voteo-muestro">'
						+'<div class="col-lg-12 col-md-12 col-sm-12">'
						+'<input type="radio" name="radiog_lite" id="radio'+data.infos[i].idvoto_respuesta+'" class="css-checkbox" value="u-'+data.infos[i].idvoto_respuesta+'"><label for="radio'+data.infos[i].idvoto_respuesta+'" class="css-label">'+data.infos[i].opcion+'</label>'
						+'</div>'
						+'</div>'
						+'<hr />');
					};
				    $(".pregunta").html(pregunta);
					$("#notificacion").hide();
				    if (!yavotos) {
				    	clearTimeout(settime);
				    	$("#reloj_cuenta").val(20);
				    	cuenta_regresiva();
						$(".css-checkbox").off();
						$(".css-checkbox").click(function(){
							var ide=$(this).val();
							$(".barrita").show();
							var user=$("#usuario").val();
							socket.emit("voto",{ide:ide,user:user,pregunta:idepregunta},function(data){
								
							});
							$(".cierro-voto").show();
							pongo_off();
						});
				    }else{
				    	$(".fondo-negro").show();
						$(".contiene-pregunta").show();
						pongo_off();
				    	socket.emit("voto2",idepregunta,function(data){
									
								});
				    	$(".cierro-voto").show();
				    }
				}else{
					$(".fondo-negro").hide();
					$(".contiene-pregunta").hide();
				}
			}
			
		});
		function pongo_off(){
			$(".css-checkbox").off();
			$(".css-checkbox").prop("disabled",true);
			$(".gracias").show();
		}
		socket.on("calculando",function(data){
			
			var algo=Object.keys(data);

			var total=0;
			for (var i = 0,p=1; i < algo.length; i++,p++) {
				total+=data[algo[i]];
			}

			for (var i = 0,p=1; i < algo.length; i++,p++) {
				var num=(parseInt(data[algo[i]])*100)/total;
				console.log(num)
				var otro=algo[i].split("-");
				//$("#progressbar"+i).css({"width":num+"%"},1000);
				$("#progressbar"+otro[1]).animate({ width: num+"%" }, 1000 );
				$(".porcentaje"+otro[1]).html(Math.round(num)+"%");
			}
		});
		$(".cerrar-alerta").click(function(){
			$(".alerta-login").hide();
		});
		function ingresar(){
			var email=$("#email").val();
			var pass=$("#pass").val();
			if (email=='' || pass=='') {
				$(".alerta-login").show();
				$(".txt-alerta").html("No deje campos vacios");

				return;
			}
			socket.emit("login",{email:email,pass:pass},function(data){
				console.log(data);
				if (data) {
					$("#usuario").val(data[0]);
					$(".fondo-negro").hide();
					$(".login").hide();
					listar_notas(0);
				}else{
					$(".alerta-login").show();
					$(".txt-alerta").html("Usuario y/o contraseña incorrecta");
					return;
				}
			});
		}
		function envio_pregunta(){
			$(".txt-textos").hide();
			$(".txt-enviando").show();
			$(".mandando-pregunta").show();
			var pregunta=$("#pregunta-ponente").val();
			var user=$("#usuario").val();
			socket.emit("pregunta live",{user:user,pregunta:pregunta},function(data){
				console.log(data);
				if (data) {
					$(".txt-textos").hide();
					$(".txt-confirmado").show();
					$("#pregunta-ponente").val("");
				/*	$(".cerrar-pregunta").click(function(){
						$(".mandando-pregunta").hide();
					});*/
					setTimeout(function(){$(".mandando-pregunta").hide();},2000);
				};
			});
		}
		function listar_notas(donde){
			var user=$("#usuario").val();
			socket.emit("listar notas",user,function(data){
				console.log(data.length);
				if (donde==0) {
					console.log("si hay notassss");
					$(".listar-notas").html('');
					if (data.length>0) {
						for (var i = 0; i < data.length; i++) {
							$(".listar-notas").append('<div class="view-nota" id="'+data[i].idnotas+'">'+data[i].titulo+'</div><input type="hidden" id="tmp-nota-'+data[i].idnotas+'" ><br>');
							$("#tmp-nota-"+data[i].idnotas).val(data[i].nota);
						}
						$(".view-nota").click(function(){
							$(".btn-borro-nota").show();
							var ide=$(this).attr("id");
							var nombre=$(this).html();
							var nota=$("#tmp-nota-"+ide).val();
							$("#ide_nota").val(ide);
							$("#actualizo_nota").val(1);
							$("#nombre-nota").val(nombre);
							$("#comentario-nota").val(nota);
							$(".guardar-nota").show();
						});
						$(".listar-notas").show();
					}else{
						$(".guardar-nota").show();
							//$(".listar-notas").hide();
					}
				}else{
					console.log("no hay notass");
					console.log(data.length);
					$(".listar-notas").html('');
					if (data.length>0) {
						for (var i = 0; i < data.length; i++) {
							$(".listar-notas").append('<div class="view-nota" id="'+data[i].idnotas+'">'+data[i].titulo+'</div><input type="hidden" id="tmp-nota-'+data[i].idnotas+'" ><br>');
							$("#tmp-nota-"+data[i].idnotas).val(data[i].nota);
						}
						$(".view-nota").click(function(){
							$(".btn-borro-nota").show();
							var ide=$(this).attr("id");
							var nombre=$(this).html();
							var nota=$("#tmp-nota-"+ide).val();
							$("#ide_nota").val(ide);
							$("#actualizo_nota").val(1);
							$("#nombre-nota").val(nombre);
							$("#comentario-nota").val(nota);
							$(".guardar-nota").show();
						});
					}
				}
				
			});
		}
		$(".nueva-nota").click(function(){
			$(".btn-borro-nota").hide();
			$("#ide_nota").val("");
			$("#actualizo_nota").val(0);
			$("#nombre-nota").val("");
			$("#comentario-nota").val("");
		});
		$(".btn-borro-nota").click(function(){
			borro_nota();
		});
		function guardo_nota(){
			$(".txt-textos").hide();
			$(".txt-textos2").hide();
			$(".txt-enviando2").show();
			$(".nota-enviando").show();
			$(".mandando-nota").show();
			var nombre=$("#nombre-nota").val();
			var comentario=$("#comentario-nota").val();
			var user=$("#usuario").val();
			var actualizo=$("#actualizo_nota").val();
			var idenota=$("#ide_nota").val();
			socket.emit("guardo nota",{user:user,nombre:nombre,comentario:comentario,actualizo:actualizo,idenota:idenota},function(data){
				console.log(data);
				if (data) {
					$(".txt-textos2").hide();
					$(".txt-confirmado2").show();
						$(".cerrar-pregunta").click(function(){
						$(".mandando-nota").hide();
					});
					$("#nombre-nota").val("");
					$("#actualizo_nota").val(0);
					$("#comentario-nota").val("");
					listar_notas(1);
				};
			});
		}

		/* _______________________________________________________________________________________________________ Doctor _______________________________________________________________________________ */
		var nombreDoctor;
		var retoDoctor;
		$('.basico').drag(function( ev, dd ){
			$( this ).css({
				top: dd.offsetY,
				left: dd.offsetX
			});
		});
		$('.dejoBasico').drop(function(){
			$( this ).toggleClass('cambioBasico');
		});
		$(".btn-back-doctor").click(function(){  
			$(".paginas").hide();
			$(".pag-inicio").show();
		});
		$(".btn-back-consultorio").click(function(){  
			$(".opcion-paciente-1").hide();
			$(".opcion-paciente-2").hide();
			$(".opcion-paciente-3").hide();
			$(".opcion-paciente-4").hide();
			$(".opcion-paciente-5").hide();
			$(".paginas").hide();
			$(".in-doctor").show();
			$(".mis-img-minis ").hide();
			$(".mis-opciones-minis").hide();
			$(".btn-cierro-doctor-miniPics").hide();
			$(".btn-cierro-doctor").hide();
		/*	nombreDoctor=$("#nameDoctor").val();
			retoDoctor=$("#retoDoctor").val();
			retoDoctor2=$("#retoDoctor2").val();
			ide=retoDoctor +  " Reto2: " + retoDoctor2;
			console.log(nombreDoctor + ide);

			socket.emit("guardo actividadT1",{nombreDoctor:nombreDoctor,ide:ide},function(data){
				console.log(data);
				if (data) {
					console.log("se envio click actividadT1");
				}
			});*/
		});
		$(".btn-back-casos").click(function(){  
			$(".opcion-caso-1").hide();
			$(".opcion-caso-2").hide();
			$(".paginas").hide();
			$(".in-casos").show();
			$(".mis-imgCasos-minis ").hide();
			$(".mis-casos-minis").hide();
			$(".btn-cierro-casos-miniPics").hide();
			$(".btn-cierro-caso").hide();
		});
		$(".btn-cierro-doctor").click(function(){
			$(".muestro-info-doctor").hide();
			$(".mis-opciones-minis").hide();
		});
		$(".btn-cierro-caso").click(function(){
			$(".muestro-info-caso").hide();
			$(".mis-casos-minis").hide();
		});
		$(".btn-cierro-doctor-miniPics").click(function(){
			$(".muestro-img-doctor").hide();
			$(".mis-img-minis ").hide();
		});
		$(".btn-cierro-casos-miniPics").click(function(){
			$(".muestro-img-casos").hide();
			$(".mis-imgCasos-minis ").hide();
		});
		$(".mis-opcionesConsultorio").click(function(){
			$(".muestro-perfilPaciente").show();
			var ide=$(this).attr("id");
			$(".opcion-paciente-"+ide).show();
		});
		$(".mis-opcionesCasos").click(function(){
			$(".muestro-casoPaciente").show();
			var ide=$(this).attr("id");
			$(".opcion-caso-"+ide).show();
		});
		$(".mis-opciones").click(function(){
			$(".muestro-info-doctor").show();
			$(".btn-cierro-doctor").show();
			$(".mis-opciones-minis").hide();
			$(".mis-img-minis").hide();
			$(".btn-cierro-doctor-miniPics").hide();
			var ide=$(this).attr("id");
			$(".opcionmini-"+ide).show();
			var nombreDoctor=$("#nameDoctor").val();
			/*socket.emit("guardo actividadT1",{nombreDoctor:nombreDoctor,ide:ide},function(data){
				console.log(data);
				if (data) {
					console.log("se envio click actividadT1");
				}
			});*/
		});
		$(".mis-casos").click(function(){
			$(".muestro-info-caso").show();
			$(".btn-cierro-caso").show();
			$(".mis-casos-minis").hide();
			$(".mis-imgCasos-minis").hide();
			$(".btn-cierro-casos-miniPics").hide();
			var ide=$(this).attr("id");
			$(".casomini-"+ide).show();
		});
		$(".opcionmini-pic").click(function(){
			$(".muestro-img-doctor").show();
			$(".btn-cierro-doctor-miniPics").show();
			$(".mis-img-minis").hide();
			var ide=$(this).attr("id");
			var nombreDoctor=$("#nameDoctor").val();
			$(".imgminiopcion-"+ide).show();
			/*socket.emit("guardo actividadT1",{nombreDoctor:nombreDoctor,ide:ide},function(data){
				console.log(data);
				if (data) {
					console.log("se envio click actividadT1");
				}
			});*/
		});
		$(".casomini-pic").click(function(){
			$(".muestro-img-casos").show();
			$(".btn-cierro-casos-miniPics").show();
			$(".mis-imgCasos-minis").hide();
			var ide=$(this).attr("id");
			var nombreDoctor=$("#nameDoctor").val();
			$(".imgminicaso-"+ide).show();
			/*socket.emit("guardo actividadT1",{nombreDoctor:nombreDoctor,ide:ide},function(data){
				console.log(data);
				if (data) {
					console.log("se envio click actividadT1");
				}
			});*/
		});
		$(".zoomimg").click(function(){
			$(".muestro-zoom-caso-1").show();
			$(".muestro-zoom-caso-2").show();
			$(".muestro-zoom-caso-3").show();
			$(".muestro-zoom-caso-4").show();
			$(".muestro-zoom-caso-5").show();
			var ide = $(this).attr("id");
			$(".zoomabierto-"+ide).show();
			$(".fondo-zoom").show();
			$(".btn-cierro-zoom").show(); 
		})
		$(".btn-cierro-zoom").click(function(){
			$(".fondo-zoom").hide();
			$(".btn-cierro-zoom").hide(); 
			$(".abrezoom").hide();
			$(".muestro-zoom-caso-1").hide();
			$(".muestro-zoom-caso-2").hide();
			$(".muestro-zoom-caso-3").hide();
			$(".muestro-zoom-caso-4").hide();
			$(".muestro-zoom-caso-5").hide();
		});
		$(".zoomimgCaso").click(function(){
			$(".muestro-zoomCaso-1").show();
			$(".muestro-zoomCaso-2").show();
			$(".muestro-zoomCaso-3").show();
			$(".muestro-zoomCaso-4").show();
			$(".muestro-zoomCaso-5").show();
			var ide = $(this).attr("id");
			$(".zoomabiertoCaso-"+ide).show();
			$(".fondo-zoom").show();
			$(".btn-cierro-zoomCaso").show(); 
		})
		$(".btn-cierro-zoomCaso").click(function(){
			$(".fondo-zoom").hide();
			$(".btn-cierro-zoomCaso").hide(); 
			$(".abrezoomCaso").hide();
			$(".muestro-zoomCaso-1").hide();
			$(".muestro-zoomCaso-2").hide();
			$(".muestro-zoomCaso-3").hide();
			$(".muestro-zoomCaso-4").hide();
			$(".muestro-zoomCaso-5").hide();
		});
		/* _______________________________________________________________________________________________________ FIN Doctor _______________________________________________________________________________ */
		$(".btn-envio-1").click(function(){
			$(".btn-envio-1").prop("disabled",true);
			
			var datos2=new Array($(".res1").val(),$(".res2:checked").val(),$(".res3:checked").val(),$(".res4:checked").val(),$(".res5:checked").val(),$(".res6:checked").val());
			//console.log(datos2);
			socket.emit("guardo encuesta",{datos:datos2},function(data){
				if (data) {
					$(".btn-envio-1").prop("disabled",false);
					$(".msg-encuesta").show();
					$(".manita").hide();
					$("#evaluacion").hide();
					$("#title2").hide();
					$("#enviar").hide();
					setTimeout(function(){
						$(".msg-encuesta").hide();
						$("#evaluacion").show();
						$("#title2").show();
						$("#enviar").show();
					},3000);

				}
			});
		});
		$(".btn-envio-2").click(function(){
			$(".btn-envio-2").prop("disabled",true);

			//var datos=$("#mando-encuesta-2").serialize();
			//console.log(datos);
			var datos2=new Array($(".e2-res1").val(),$(".e2-res2:checked").val(),$(".e2-res3:checked").val(),$(".e2-res4:checked").val(),$(".e2-res5:checked").val(),$(".e2-res6:checked").val(),
				$(".e2-res7:checked").val(),$(".e2-res8:checked").val(),$(".e2-res9").val());
			//console.log(datos2);
			//return false;
			socket.emit("guardo encuesta2",{datos:datos2},function(data){
				if (data) {
					$(".btn-envio-2").prop("disabled",false);
					$(".msg-encuesta").show();
					$(".manita").hide();
					$(".btn-che").show();
					$(".btn-back-encuesta").hide();
					$(".encuestas-grales").hide();
					setTimeout(function(){
						$(".msg-encuesta").hide();
						$(".muestro-encuestas").show();
						$("#enviar").show();
					},3000);
				}
			});
		});
		$(".btn-envio-3").click(function(){
			$(".btn-envio-3").prop("disabled",true);
			var pre1="";
			var pre2="";
			var pre3="";
			var pre4="";
			var pre5="";
			var pre6="";
			var pre7="";
			var pre8="";
			var pre9="";
			var pre10="";
			var pre11="";
			$(".res1-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre1=val;
				};
			});
			pre2=$("#pre2-1").val()+","+$("#pre2-2").val()+","+$("#pre2-3").val()+","+$("#pre2-4").val()+","+$("#pre2-5").val()+","+$("#pre2-6").val()+","+$("#pre2-7").val()+","+$("#pre2-otro").val();
			$(".res3-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre3=val;
				};
			});
			pre4=$("#pre4-1").val()+","+$("#pre4-2").val()+","+$("#pre4-3").val();
			$(".res5-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre5=val;
				};
			});
			$(".res6-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre6=val;
				};
			});
			$(".res7-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre7=val;
				};
			});
			$(".res8-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre8=val;
				};
			});
			$(".res9-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre9=val;
				};
			});
			$(".res10-3").each(function(){
				var val=$(this).val();
				if ($(this).is(":checked")) {
					pre10=val;
				};
			});
			pre11=$("#pre11-1").val();
			var info=new Array(pre1,pre2,pre3,pre4,pre5,pre6,pre7,pre8,pre9,pre10,pre11);
			socket.emit("guardo encuesta3",info,function(data){
				console.log(data);
				if (data) {
					$(".btn-envio-3").prop("disabled",false);
					$(".msg-encuesta").show();
					$(".encuestas-grales").hide();
					setTimeout(function(){$(".msg-encuesta").hide();$(".muestro-encuestas").show();},3000);
				}
			});
		});
		function borro_nota(){
			$(".txt-textos").hide();
			$(".txt-textos2").hide();
			$(".txt-enviando2").show();
			$(".nota-borrando").show();
			$(".mandando-nota").show();
			var idenota=$("#ide_nota").val();
			var user=$("#usuario").val();
			socket.emit("borro nota",{user:user,idenota:idenota},function(data){
				console.log(data);
				if (data) {
					listar_notas(1);
					
					$(".txt-textos2").hide();
					$(".txt-nota-borrando").show();
					$(".cerrar-pregunta").click(function(){
						$(".mandando-nota").hide();
					});
					$("#nombre-nota").val("");
					$("#actualizo_nota").val(0);
					$("#comentario-nota").val("");
					$(".btn-borro-nota").hide();
					
				};
			});
		}
		function dia1(){
			$(".generales").hide();
			$(".pag-agenda").show();
			$(".titles").hide();
			$(".titulo-agenda1").show();
			$(".dia1").show();
			$(".dia2").hide();
		}
		function dia2(){
			$(".titles").hide();
			$(".titulo-agenda2").show();
			$(".dia1").hide();
			$(".dia2").show();
		}
		function ponentes(){
			$(".pag-inicio").hide();
			$(".barra-menu").show();
			$(".titles").hide();
			$(".titulos-grales").show();
			$(".titulo-ponentes").show();
			$(".contenido-gral").show();
			$(".generales").hide();
			$(".pag-ponentes").show();
		}
		function individual(ide){
			$(".titles").hide();
			$(".generales").hide();
			$(".pag-individual").show();
			$(".ver-caras").hide();
			$(".cara"+ide).show();
			$(".ver-textos").hide();
			$(".texto"+ide).show();
		}
		var settime="";
		function cuenta_regresiva(){
			var i=20;
			var num=$("#reloj_cuenta").val();
			if (num<=0) {
				$(".cierro-voto").show();
				$("#reloj_cuenta").val(20);
				pongo_off();
			}else{
				num--;
			$("#reloj_cuenta").val(num);
			$(".reloj").html(num);
			settime=setTimeout(function(){
				cuenta_regresiva();
			},1000);
			}
		}

		socket.on('reloadAllApp',function (data) {
			console.log("tengo que reload");
			location.reload();
		});
	});
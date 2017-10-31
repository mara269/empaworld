jQuery(function($){
	$(".ir-home").hide();
	
	$('.sub-pregunta-experto').click(function() {
		$('.pag-inicio').hide();
	});
	

	// $(".btn-pregunta,.sub-pregunta-experto").click(function(){
	// 	$(".fondo-negro").show();
	// 	$(".tanger-live").show();
	// });

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
	
	$(".btn-menu").click(function(){
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
	
	
	function envio_pregunta(){
		$(".txt-textos").hide();
		$(".txt-enviando").show();
		$(".mandando-pregunta").show();
		var pregunta=$("#pregunta-ponente").val();
		var user=$("#usuario").val();
		console.log(user);
		socket.emit("pregunta live",{user:user,pregunta:pregunta},function(data){
			console.log(data);
			if (data) {
				$(".txt-textos").hide();
				$(".txt-confirmado").show();
				$("#pregunta-ponente").val("");
			
				setTimeout(function(){$(".mandando-pregunta").hide();},2000);
			};
		});
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
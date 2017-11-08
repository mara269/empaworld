$(document).ready(function() {
	$('.menu, .b-none').click(function() {
		$(".menu-option").slideToggle("slow","swing");
	});
	
	$('.opt').click(function() {
		var id = $(this).attr("id");
		var current = $('#current').val();

		$(".menu-option").hide();

		$("." + current).addClass('oculto');
		$("." + id).removeClass('oculto');
		
		$('.logos').removeClass("logos_encuesta");

		if(id == 'encuestas_satisfaccion') {
			$('.logos').addClass("logos_encuesta");
		}
		limpiar_checks();

		$('#current').val(id);
	});

	$('.opt-en').click(function() {
		var id = $(this).attr("id");

		$( ".opt-en" ).each(function( index ) {
			$(this).removeClass('active');		  
		});

		$(this).addClass('active');

		$('#pregunta-1').val(id);
	});

	$(".btn-envio-next").click(function() {
		var id = $(this).attr("id");
		var name = $('#nombre').val();

		if(name != "") {
			$(".step-"+id).addClass('oculto');
			$(".step-"+(parseInt(id) + 1)).removeClass('oculto');
		}else {
			$('.msg-txt').text("lo sentimos, el campo de nombre es obligatorio");
			$('.msg-alert').removeClass('oculto');
		}
		
	});

	$('.save').click(function() {
		var data = new Array();

		data[0] = $('#nombre').val();
		data[1] =  ($('#pregunta-1').val() == "")? 'default': $('#pregunta-1').val();
		for(var i = 2; i < 11; i++) {
			data[i] = ($('input:radio[name=pregunta_' + (i+1) + ']:checked').val() == undefined)?'default':$('input:radio[name=pregunta_' + (i+1) + ']:checked').val();
		}

		data[11] =  ($('#pregunta-11').val() == "")? 'default': $('#pregunta-11').val();

		envio_encuesta(data);
		
	});

	$('.breakout_position').click(function() {
		var id = $(this).attr("id");
		$('#position').val(id);
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

	$('.msg-close').click(function() {
		$('.msg-alert').addClass('oculto');
	});

	$(".btn-envio-pregunta").click(function(){
		if($('#pregunta-ponente').val() != "") {
			envio_pregunta();	
		}else {
			$('.msg-txt').text("lo sentimos, el campo de pregunta no puede ir vacio!");
			$('.msg-alert').removeClass('oculto');
		}
		
	});

	socket.on("hay alerta",function(data){
		if (data.op) {
			$('.msg-txt').text(data.msg);
			$('.msg-alert').removeClass("oculto");
			setTimeout(function(){
				$('.msg-txt').text("");
				$('.msg-alert').addClass("oculto");
			},8000);
		}else{
			$('.msg-txt').text("");
			$('.msg-alert').addClass("oculto");
		}
	});

	socket.on("hay voteo", function(data){
		// console.log("hay voteo");
		// console.log(data);
		// console.log(data);

		// console.log($('#position').val());
		var breakout_position = $('#position').val();
		if(breakout_position == data.breakout) {
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
			}else if (data.opp=="2") {
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
		}// if que valida el breakout
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
			// console.log(total);
			// console.log(num)
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
		$('.msg-1').html('Su pregunta se esta enviando<br /> Espere por favor...');
		$(".mandando-pregunta").removeClass('oculto');
		
		var pregunta = $("#pregunta-ponente").val();
		
		setTimeout(function(){
			socket.emit("pregunta live",{pregunta:pregunta},function(data){
				if (data) {
					$("#pregunta-ponente").val("");
					$(".txt-enviando").addClass('oculto');
					$('.msg-2').text("Su pregunta se envio con exito.");
					$(".txt-confirmado").removeClass('oculto');

					setTimeout(function(){
						$(".mandando-pregunta").addClass('oculto');
						$(".txt-enviando").removeClass('oculto');
						$(".txt-confirmado").addClass('oculto');
						$('.tanger-live').addClass('oculto');
						$('.pag-inicio').removeClass('oculto');
						$('#current').val('pag-inicio');
					},2000);
				};
			});
		}, 2000);
	}	
	
	function envio_encuesta(data){
		$('.msg-1').html('Su encuesta se esta enviando<br /> Espere por favor...');
		$(".mandando-pregunta").removeClass('oculto');		
		
		setTimeout(function(){
			socket.emit("save survey",{data:data},function(callback){
				if (callback) {
					$(".txt-enviando").addClass('oculto');
					$('.msg-2').text("Su encuesta se envio con exito.");
					$(".txt-confirmado").removeClass('oculto');

					setTimeout(function(){
						$(".mandando-pregunta").addClass('oculto');
						$(".txt-enviando").removeClass('oculto');
						$(".txt-confirmado").addClass('oculto');
						$('.encuestas_satisfaccion').addClass('oculto');
						$('.pag-inicio').removeClass('oculto');
						limpiar_checks();

						$('#current').val('pag-inicio');
					},2000);
				};
			});
		}, 2000);
	}	


	function limpiar_checks() {
		$('.step-1').removeClass("oculto");
		$('.step-2, .step-3, .step-4, .step-5, .step-6 ').addClass("oculto");
		
		$('#nombre, #pregunta-1, #pregunta-11').val("");

		$( ".opt-en" ).each(function( index ) {
			$(this).removeClass('active');		  
		});

		$('input:radio').removeAttr('checked');
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
$(document).ready(function() {		
	var socket = io.connect();

	socket.on("hay voteo", function(data){
		var sala = $('#sala').val();
		
		if(data.breakout == sala) {
			if (data.opp == "2") {
				if (data.op) {
					var pregunta = "";
					var idepregunta = "";
					var yavotos = data.yavoto;
					$(".respuestas").html('');

					for (var i = 0; i < data.infos.length; i++) {
						pregunta = data.infos[0].nombre;
						idepregunta = data.infos[0].idvoto_pregunta;
						
						$("#ide_pregunta").val(idepregunta);
						
						$(".respuestas").append('<div class="row">'
						+'<div class="col-lg-7 col-md-7 col-sm-7 format">'
						+''+ data.infos[i].opcion +''
						+'</div>'
						+'<div class="col-lg-4 col-md-4 col-sm-4 oculto barrita">'
						+'<div id="progressbar'+ data.infos[i].idvoto_respuesta +'" class="progressbar"></div>'
						+'</div>'
						+'<div class="col-lg-1 col-md-1 col-sm-1 oculto barrita">'
						+'<div class="porcentaje'+ data.infos[i].idvoto_respuesta +' percent"></div>'
						+'</div>'
						+'</div>'
						+'<hr />');
					}

					$(".progressbar").progressbar({
						value:false
					});

					$(".barrita").show();
					$(".progressbar").css("width","0%");
				    $(".pregunta").html(pregunta);
				    
				    if (!yavotos) {
				    	clearTimeout(settime);
				    	$("#reloj_cuenta").val(15);
				    	cuenta_regresiva();
						
						$(".css-checkbox").off();
						$(".css-checkbox").click(function(){
							var ide = $(this).val();
							$(".barrita").show();
							var user = $("#usuario").val();
							socket.emit("voto",{ide:ide,user:user,pregunta:idepregunta},function(data){});
							$(".cierro-voto").show();
							pongo_off();
						});
				    }else{
				    	$(".contiene-pregunta").show();
						pongo_off();
				    	socket.emit("voto2",idepregunta,function(data){});
				    	$(".cierro-voto").show();
				    }

				}else{
					$(".contiene-pregunta").hide();
				}
			}
		}//termina if de voteo de breakout		
	});

	socket.on("calculando",function(data){
		var algo = Object.keys(data);
		var total = 0;

		for (var i = 0, p = 1; i < algo.length; i++, p++) {
			total += data[algo[i]];
		}

		for (var i = 0, p = 1; i < algo.length; i++, p++) {
			var num = (parseInt(data[algo[i]]) * 100) / total;
			var otro = algo[i].split("-");
			
			$("#progressbar" + otro[1]).animate({ width: num+"%" }, 1000 );
			$(".porcentaje" + otro[1]).html(Math.round(num)+"%");
		}
	});

	var settime="";
	function cuenta_regresiva(){
		var i = 20;
		var num = $("#reloj_cuenta").val();
		if(num <= 0) {
			$(".cierro-voto").show();
			$("#reloj_cuenta").val(15);
			var que = $("#ide_pregunta").val();
			
			socket.emit("finalizo voto",que,function(){});
		}else{
			num--;
			$("#reloj_cuenta").val(num);
			$(".reloj").html(num);
			settime = setTimeout(function(){
				cuenta_regresiva();
			},1000);
		}
	}
});
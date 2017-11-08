$(document).ready(function() {
	$('.save-break').click(function() {
		var array = new Array();
		var question = [$('#pregunta_1').val(), 3]

		if(question != "") {
			$(".ip-1").each(function(index) {
				if($(this).val() != "" ) {
					array.push($(this).val());
				}
	        });	

	        if( array.length != 0 ) {
	        	if( array.length >= 2 ) {
	        		
	        		socket.emit("add question", { question: question,answers: array }, function(data) {
	        			if(data) {
	        				alert("Su pregunta ha sido agregada con éxito!");
	        				location.reload();
	        			}
			        });

	        	}else {
		        	alert("lo sentimos, debes agregar por lo menos 2 respuestas!");	
		        }
	        }else {
	        	alert("lo sentimos, debes agregar respuestas!");	
	        }
		}else {
			alert("lo sentimos, el campo de pregunta no puede estar vacio!");
		}
	});

    $('.btn-gral').click(function() {
        var id = $(this).attr("id");

        if (id != 4) {
            $(".btn-gral").each(function(index) {
                $(this).removeClass('active');
            });

            $('.layer').addClass('oculto');

            $('.panel-' + id).removeClass('oculto');
            $(this).addClass('active');
        }

    });

    $("#ver-alertas").click(function() {
        $(".contenedores").hide();
        $(".div-alertas").show();
    });

    $('.box-break').click(function() {
        var id = $(this).attr("id");

        $(".box-break").each(function(index) {
            $(this).removeClass('active');
        });

        $('.breakout').addClass('oculto');
        $('.breakout-' + id).removeClass('oculto').addClass();

        $(this).addClass('active');
    });


    var socket = io.connect();

    $(".btn-reload").click(function() {
        socket.emit('reloadApp');
    });

    socket.on("que voteo", function(data) {
        console.log(data);

        $(".breakout-1, .breakout-2, .breakout-3").html("");

        for (var i = 0; i < data.length; i++) {
            if (data[i].breakout == '1') {
                $(".breakout-1").append('<div class="row listo-preguntas"><div class="col-sm-8"><div class="question">' + data[i].nombre + '</div></div><div class="col-sm-2"><div class="mandar-voteo btn btn-success btn-lg" id="' + data[i].idvoto_pregunta + '">Mandar</div></div><div class="col-sm-2"><div class="cerrar-voteo btn btn-danger btn-lg" id="' + data[i].idvoto_pregunta + '">Cerrar</div><input type="hidden" class="pos-' + data[i].idvoto_pregunta + '" value="' + data[i].breakout + '" /></div></div>');
            } else if (data[i].breakout == '2') {
                $(".breakout-2").append('<div class="row listo-preguntas"><div class="col-sm-8"><div class="question">' + data[i].nombre + '</div></div><div class="col-sm-2"><div class="mandar-voteo btn btn-success btn-lg" id="' + data[i].idvoto_pregunta + '">Mandar</div></div><div class="col-sm-2"><div class="cerrar-voteo btn btn-danger btn-lg" id="' + data[i].idvoto_pregunta + '">Cerrar</div><input type="hidden" class="pos-' + data[i].idvoto_pregunta + '" value="' + data[i].breakout + '" /></div></div>');
            } else if (data[i].breakout == '3') {
                $(".breakout-3").append('<div class="row listo-preguntas"><div class="col-sm-8"><div class="question">' + data[i].nombre + '</div></div><div class="col-sm-2"><div class="mandar-voteo btn btn-success btn-lg" id="' + data[i].idvoto_pregunta + '">Mandar</div></div><div class="col-sm-2"><div class="cerrar-voteo btn btn-danger btn-lg" id="' + data[i].idvoto_pregunta + '">Cerrar</div><input type="hidden" class="pos-' + data[i].idvoto_pregunta + '" value="' + data[i].breakout + '" /></div></div>');
            }
        }



        $(".mandar-voteo").click(function(e) {
            e.preventDefault();
            var ide = $(this).attr("id");
            var id = $('.pos-' + ide).val();
            console.log(id);
            socket.emit("mando voteo", {
                opp: 2,
                op: true,
                estado: 1,
                ide: ide,
                breakout: id
            }, function(data) {});
        });


        $(".cerrar-voteo").click(function(e) {
            e.preventDefault();
            var ide = $(this).attr("id");
            var id = $('.pos-' + ide).val();
            console.log("cancelo la votacion");
            socket.emit("mando voteo", {
                opp: 2,
                op: false,
                estado: 0,
                ide: ide,
                breakout: id
            }, function(data) {});
        });

    });

    $("#mandonotificacion").click(function(e) {
        e.preventDefault();
        var mg = $("#msg-notificacion").val();
        socket.emit("mando alerta", {
            opp: 1,
            msg: mg,
            op: true
        }, function(data) {

        });
    });

    $("#cancelonotificacion").click(function(e) {
        e.preventDefault();
        socket.emit("mando alerta", {
            opp: 1,
            msg: "cierro el voteo",
            op: false
        }, function(data) {

        });
    });

    $("#cancelovoteo").click(function(e) {
        e.preventDefault();
        socket.emit("mando voteo", {
            opp: 2,
            msg: "cierro el voteo",
            op: false
        }, function(data) {

        });
    });

    socket.on("voto", function(data) {
        console.log(data);
    });
});
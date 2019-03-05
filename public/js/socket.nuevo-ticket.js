//comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket'); //Con esto conseguimos una referencia directa al label, lo utilizaremos a menudo

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Conexión Finalizada');
});

//recibimos el estado actual
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual)
})

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});
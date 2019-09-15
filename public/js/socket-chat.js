var socket = io();


var params = new URLSearchParams(window.location.search);



if (!params.has('nombre') || !params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre  y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');
    //El servidor sabe quien se ha conectado                                             
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conecatados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// // Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchamos el mensaje del usuario que abandono la sala
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale de la sala de chat
socket.on('listaPersonas', function(personas) {
    console.log(personas);
})



//Mensajes privados

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado: ', mensaje);
})
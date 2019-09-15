const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');


const usuario = new Usuarios;

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {


        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                message: 'el nombre y la sala son  necesarios'
            });
        }
        //unimos el cliente a una sala
        client.join(data.sala)

        let personas = usuario.agregarPersona(client.id, data.nombre, data.sala);
        //envia todas las personas que se encuentran en ese listado 
        client.broadcast.to(data.sala).emit('listaPersonas', usuario.getPersonasPorSala(data.sala));

        callback(usuario.getPersonasPorSala(data.sala));

    });



    client.on('crearMensaje', (data) => {
        //obtenemos los datos de la perosna que envia el mensaje
        let persona = usuario.getPersona(client.id);
        // Construimos un nuevo mensaje a partir de la data que recibimos por el usuario 
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        //  Emitimos el mensaje a toda la sala
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    })



    //Eliminamos la duplicidad de los usuarios
    client.on('disconnect', () => {
        let personaBorrada = usuario.borrarPersona(client.id);


        //emitimos un mesanje con la persona que abandonó la sala
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('admin', `${personaBorrada.nombre} salió`));
        //Regresamos el nuevo listado de personas conectadas        
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuario.getPersonas());
    });


    //Mensajes Privados

    client.on('mensajePrivado', data => {

        let persona = usuario.getPersona(client.id)

        client.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

});
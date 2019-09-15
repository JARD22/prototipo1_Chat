class Usuarios {

    constructor() {
        this.personas = [];
    }

    //Agregar una persona a un chat o una sala
    agregarPersona(id, nombre, sala) {
        //creamos un nuevo objeto para a;adirlo al arreglo de personas
        let persona = { id, nombre, sala };
        this.personas.push(persona);

        return this.personas;
    };

    //obtener una persona del chat
    getPersona(id) {
        //regresamos el elemetno que coincida con el id
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    };

    //Retornamos a todas las personas
    getPersonas() {
        return this.personas
    };


    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala)
        return personasEnSala
    }


    //Esta funcion regresa un nuevo arreglo
    borrarPersona(id) {

        //obtenemos la persona que sale del chat
        let personaBorrada = this.getPersona(id);

        //retornamos un nuevo arreglo sin la persona que ha salido del chat
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    };






}

module.exports = {
    Usuarios
}
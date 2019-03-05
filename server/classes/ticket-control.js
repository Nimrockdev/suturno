const fs = require('fs');


class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');

        /* console.log(data); */
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }
    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`
    }
    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) { // recibimos el escritorio

        //Verificamos que hay tickets pendiente de procesar
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //Obtengo el número
        let numeroticket = this.tickets[0].numero;
        //Eliminio la primera posición del array
        this.tickets.shift();
        //Creo el primero ticket que se va a atender con su escritorio
        let atenderTicket = new Ticket(numeroticket, escritorio);
        //Agrego el ticket al principio del array
        this.ultimos4.unshift(atenderTicket); //Pone los 4 tickets ultimos al principio
        //Verifico que solo existen 4 tickets a procesar
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borrar el ultimo
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);
        //Grabamos el archibo
        this.grabarArchivo();
        //Retornamos el ticket que atenderemos
        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Reinicio del sistema iniciado');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        /* console.log('Reinicio del sistema finalizado'); */

    }
}

module.exports = {
    TicketControl
};
const {io} =require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands =  new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Heroes del Silencio' ) );
bands.addBand( new Band( 'Daniel F' ) );
bands.addBand( new Band( 'AC/DC' ) );

//console.log(bands);

//mensajes de sockets

io.on('connection', client => {

    console.log('Cliente Conectado')

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => { console.log('Cliente Desconectado')});

    client.on('mensaje', (payload) => {
        console.log('mensaje!!',payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    
    
    });

    client.on('vote-band', ( payload ) =>{
        console.log(payload);
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', ( payload ) =>{
        console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payload ) =>{
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
    });

    /* client.on('emitir-mensaje', (payload) => {

        client.broadcast.emit('nuevo-mensaje', payload);
    
    }); */
    
});
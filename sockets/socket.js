const {io} =require('../index');

//mensajes de sockets

io.on('connection', client => {

    console.log('Cliente Conectado')

    client.on('disconnect', () => { console.log('Cliente Desconectado')});

    client.on('mensaje', (payload) => {
        console.log('mensaje!!',payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    
    
    });

    
});
'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

const io = require('socket.io')(port);

// connection been emitted automatically by Socket io
io.on('connection', socket => {
    console.log('Welcome, your socket id:', socket.id);

    socket.on('hello', payload => {
    console.log('The server heard the hello event. Payload:', payload);

    socket.emit('hi', `Hi, ${payload.username}`)
    });


    socket.on('goodbye', payload => {
    console.log('The server heard the GoodBye event');
    socket.emit('bye');
    // socket.disconnect();
    io.disconnect();
    })
})

// require('dotenv').config();
// const port = process.env.PORT || 3000;
// const host = `http://localhost:${port}`;

// const io = require('socket.io-client');
// const socket = io.connect(host);

// socket.emit('states');
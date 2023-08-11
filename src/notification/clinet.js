'use strict';


const port = process.env.PORT || 3001;

const io = require('socket.io-client');
const host = `http://localhost:${port}`;
const socket = io.connect(host);

socket.emit('hello', { username: 'abdullah' });

socket.on('hi', payload => {
    console.log(payload)
    console.log('The server said:', payload);
})

// setTimeout(() => {
//     socket.emit('goodbye')  
// }, 5000)

// socket.on('bye', byeHandler)

// function byeHandler(payload) {
//     console.log('Bye');
//     socket.disconnect();
// }

// const port = process.env.PORT || 3000;

// const express = require('')

// const io = require('socket.io-client');
// const host = `http://localhost:${port}/states`;
// const socket = io.connect(host);



// socket.emit('hello', { username: 'abdullah' });

// socket.on('patient', payload => {
//     console.log('aaaaaaaaaaaaa',payload)
//     if(payload.patientStates >= 90) console.log('watch your states');
// })
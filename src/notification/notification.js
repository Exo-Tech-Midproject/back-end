// 'use strict'

// const port = process.env.port|| 3000;

// const io = require('socket.io')(port);

// io.on('connection', socket => {
//     console.log('Welcome, your socket id:', socket.id);

//     // socket.on('hello', payload => {
//     // console.log('The server heard the hello event. Payload:', payload);

//     // socket.emit('hi', `Hi, ${payload.username}`)
//     // })

//     socket.on('states', () => {
//         setInterval(() => {
//         const patientStates = Math.ceil(Math.random() * 100);
//         console.log('--------------------');
//         console.log('patientStates is:', patientStates);
//         io.emit('patient', {patientStates: patientStates});
//         }, 3000)
//     })
// })
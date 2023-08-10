'use strict';

require('dotenv').config();
const port = process.env.PORT || 3005;

const io = require('socket.io')(port);
const vitalSigns = require('../models/vitalSigns/vitalSigns')

// Socket.IO integration for physicians
io.on('connection', (socket) => {
    console.log(socket.id);

    // Listen for high-vitals event
    socket.on('high-vitals', (data) => {
        console.log('dataaaaaaaaaa', data);
        console.log('High vitals detected:', data.vital);

        // Emit a push notification event
        socket.emit('push-notification', {
            message: 'High vitals detected for a patient.'
        });
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('Physician disconnected');
    });
});










// this one will do the cennection over /
// io.on('connection', socket => {
//     console.log('Your connected to the Server, you id:', socket.id);

//     socket.on('status', () => {
//         setInterval(() => {
//             const patientStatus = "100"
//             console.log(patientStatus)
//             console.log('--------------------');
//             console.log('Brightness detected:', brightness);
//             io.emit('brightness', { brightness: brightness });
//         }, 3000)
//     })
// })

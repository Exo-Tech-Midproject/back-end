'use strict';

// require('dotenv').config();
// const port = process.env.PORT || 3000;
// const host = `http://localhost:${port}/status`;

// const io = require('socket.io-client');
// const socket = io.connect(host);

// socket.on('connect', () => {
//     console.log('Connected to server');
// });
// statusRoute.get('/status/vital/:patientUN', async (req, res, next) => {})
// socket.on('push-notification', (data) => {
//     console.log('Push Notification:', data.message);
//     // Implement your notification UI logic here
//     // Display the notification to the physician
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected from server');
// });


require('dotenv').config();
const port = process.env.PORT || 3005;
const host = `http://localhost:${port}`;
const io = require('socket.io-client');

const socket = io.connect(host);


socket.on('connect', () => {
    console.log('Connected to server');

    // Simulate emitting a high-vitals event
    // socket.emit('high-vitals', { vital: 123 });
});

socket.on('push-notification', (data) => {
    console.log('Push Notification:', data.message);
    // Implement your notification UI logic here
    // Display the notification to the physician
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

io.of("/vitals").on("connection", (socket) => {
    socket.emit("testing", "hello world");

});
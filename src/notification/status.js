'use strict';


// require('dotenv').config();
// const port = process.env.PORT || 3000;
// const host = `http://localhost:${port}/status`;
// const { vitals } = require('../models')

// const express = require('express')

// const statusRoute = express.Router()
// const io = require('socket.io-client');
// const socket = io.connect(host);

// statusRoute.get('/status/vital/:patientUN', async (req, res, next) => {
//     try {
//         // Save the vitals data to the database
//         const vitalsData = req.body;
//         const savedVitals = await vitals.create(vitalsData);

//         // Check for high values
//         if (vitalsData.heartRate > 150 || vitalsData.oxygenSat < 90 /* ... other checks ... */) {
//             savedVitals.update({ isHigh: true });

//             // Emit a notification event to physicians
//             socket.emit('high-vitals', { vitalsId: savedVitals.id });
//         }

//         res.status(201).json(savedVitals);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while saving vitals.' });
//     }
// });



require('dotenv').config();
const port = process.env.PORT || 3005;
const host = `http://localhost:${port}`;
const vital = require('../models');
const express = require('express');
const io = require('socket.io-client');

const statusRoute = express.Router();
const socket = io.connect(host);

socket.on("connect", (payload) => {

    console.log("iam connected")

    // statusRoute.post('/status/vital/:patientUN', async (req, res, next) => {
    //     try {
    //         const patientUN = req.params.patientUN;
    //         const vitalsData = req.body;
    //         const savedVitals = await vital.create({
    //             vitalsData,
    //             patientUN: patientUN
    //         });

    //         if (vitalsData.heartRate > 150) {
    //             savedVitals.update({ isHigh: true });
    //             socket.emit('high-vitals', { savedVitals: savedVitals });
    //         }

    //         res.status(201).json(savedVitals);
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({ error: 'An error occurred while saving vitals.' });
    //     }
    // });

})

module.exports = statusRoute;

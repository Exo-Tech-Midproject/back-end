'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const moment = require('moment')

//------ new work 
const http = require('http')
const { Server } = require("socket.io");
const server = http.createServer(app)
const io = new Server(server, { pingTimeout: 60000, cors: { origin: '*' } });



io.on('connection', (socket) => {
    console.log(`socket with id ${socket.id} is connected`)
    socket.on('tryme', (payload) => {
        console.log(payload)
    })
    socket.on('enter chat', (payload) => {
        let socketName = payload.username
        let socketTime = moment().format('h:mm a')

        // console.log(payload)
        socket.join(`${payload.roomName}`)
        let obj = {
            msg: `${socketName} is  Online`,
            name: payload.username,
            time: socketTime
        }
        // socket.broadcast.to(payload.roomName).emit('chat message', obj)
        socket.on('chat message', (msg) => {
            console.log(msg, '22222')
            io.to(payload.roomName).emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            // let obj = {
            //     msg: `${socketName} is Offline`,
            //     name: payload.username,
            //     time: socketTime
            // }
            console.log('disconnected')
            // io.to(payload.roomName).emit('chat message', obj)
        })
    })


    socket.on('left-chat', (payload) => {
        console.log(payload, 'aaaaaaaaaaaaaa')
    })
})


let vitalsNotification = io.of('/notifications')

vitalsNotification.on('connection', (socket) => {
    socket.on('problem')
})

//-------------------

// require('dotenv').config();
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const cookieParser = require('cookie-parser');


// const relations = require("./routes/testingRelations/testingRelations")
// const subscriptionRouter = require("./routes/subscriptions/subscriptions")
// const passwordRouter = require('./routes/forgetPassword/forgetPassword')
const patientRoute = require("./routes/userRouter/userPatientRouter")
const physicianRoute = require("./routes/userRouter/userPhysicianRouter")
const genenralRoute = require("./routes/generalRouter/generalRouter")



// using libraries ------------------------------------

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))
app.use(cookieParser());


// using routes ------------------------------------

// app.use(relations)
// app.use(subscriptionRouter)
app.use(patientRoute)
app.use(physicianRoute)
app.use(genenralRoute)
// app.use(passwordRouter)




// ErrorHandlers ------------------------------------
app.use(notFound);
app.use(errorHandler);


//----------- New Work 
//--------------------

function start(port) {
    server.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = { start, app }
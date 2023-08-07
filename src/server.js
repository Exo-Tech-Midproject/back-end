'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

// require('dotenv').config();
const userRouter = require('./routes/userRouter/userRouter');
const diseaseRouter = require('./routes/diseaseRoute/diseaseRouter');
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const qaRoutes = require('./routes/qaRoute/qaRoute');

// const physQaRouter = require("./routes/qaRoute/physQaRoute") // doesn't exist
const relations = require("./routes/testingRelations/testingRelations")
const subscriptionRouter = require("./routes/subscriptions/subscriptions")
const prescriptionRouter = require("./routes/prescriptionsRoute/prescriptionRoute")
const vitalsRouter = require("./routes/vitalsRoute/vitalsRoutePatient")
const vitalsPhysicianRouter = require("./routes/vitalsRoute/vitalRoutePhysician")

const commentRoutes = require("./routes/qaRoute/commentsRoute")


// const patientRouter = require('./routes/patientRoute/patientRoute')
// const physicianRouter = require('./routes/physicianRoutes/physicianRoutes');

// using libraries ------------------------------------

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// using routes ------------------------------------

// app.use(patientRouter);
// app.use(physicianRouter)
app.use(userRouter)

app.use(qaRoutes)
app.use(commentRoutes)
app.use(diseaseRouter)
app.use(relations)
app.use(subscriptionRouter)
app.use(prescriptionRouter)
app.use(vitalsRouter)
app.use(vitalsPhysicianRouter)




// ErrorHandlers ------------------------------------
app.use(notFound);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = { start, app }
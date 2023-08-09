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
const cookieParser = require('cookie-parser');


const groupRouter = require("./routes/groupsRouter/groupsRouter")
// const physQaRouter = require("./routes/qaRoute/physQaRoute") // doesn't exist
const relations = require("./routes/testingRelations/testingRelations")
const subscriptionRouter = require("./routes/subscriptions/subscriptions")
const prescriptionRouter = require("./routes/prescriptionsRoute/prescriptionRoute")
const vitalsRouter = require("./routes/vitalsRoute/vitalsRoutePatient")
const vitalsPhysicianRouter = require("./routes/vitalsRoute/vitalRoutePhysician")


const passwordRouter = require('./routes/forgetPassword/forgetPassword')

const commentRoutes = require("./routes/qaRoute/commentsRoute")
const patientRoute = require("./routes/userRouter/userPatientRouter")
const physicianRoute = require("./routes/userRouter/userPhysicianRouter")
const genenralRoute = require("./routes/generalRouter/generalRouter")




// const patientRouter = require('./routes/patientRoute/patientRoute')
// const physicianRouter = require('./routes/physicianRoutes/physicianRoutes');

// using libraries ------------------------------------

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser());


// using routes ------------------------------------

// app.use(patientRouter);
// app.use(physicianRouter)
// app.use(userRouter)
// app.use(qaRoutes)
// app.use(commentRoutes)
// app.use(diseaseRouter)
// app.use(groupRouter)
app.use(relations)
app.use(subscriptionRouter)
app.use(patientRoute)
app.use(physicianRoute)
app.use(genenralRoute)
// app.use(prescriptionRouter)
// app.use(vitalsRouter)
// app.use(vitalsPhysicianRouter)

app.use(passwordRouter)




// ErrorHandlers ------------------------------------
app.use(notFound);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = { start, app }
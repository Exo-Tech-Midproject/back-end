'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

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
app.use(cors())
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


function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = { start, app }
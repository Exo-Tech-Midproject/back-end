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
app.use(diseaseRouter)



// ErrorHandlers ------------------------------------
app.use(notFound);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = {start,app}
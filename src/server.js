'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

// require('dotenv').config();
const patientRouter = require('./routes/patientRoute/patientRoute')
const physicianRouter = require('./routes/physicianRoutes/physicianRoutes');
// const morgan = require('morgan');
const router = express.Router();

router.param
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');





app.use(express.json())
app.use(cors())
// app.use(morgan())
app.use(patientRouter);
app.use(physicianRouter)

// Catchalls
app.use(notFound);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = {start,app}
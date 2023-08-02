'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
// const morgan = require('morgan');
const router = express.Router();

// router.param

const physicianRouter = require('./routes/physicianRoutes/physicianRoutes');

app.use(express.json())
app.use(cors())
// app.use(morgan())

// Routes
app.use(physicianRouter)

// Catchalls
app.use(notFound);
app.use(errorHandler);

function start(port){
    app.listen(port , ()=> console.log(`up and running on port ${port}`))
}

module.exports = start
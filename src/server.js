'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
// require('dotenv').config();

// const morgan = require('morgan');
const router = express.Router();

router.param





app.use(express.json())
app.use(cors())
// app.use(morgan())

function start(port){
    app.listen(port , ()=> console.log(`up and running on port ${port}`))
}

module.exports = start
'use strict'

require('dotenv').config();
const PORT = process.env.PORT;

const {db} = require('./src/models')
const {start} = require('./src/server')

db.sync().then(() => {
    start(PORT);
})

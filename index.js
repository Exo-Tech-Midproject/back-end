'use strict'

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const {db} = require('./src/models')
const {start} = require('./src/server')

db.sync({force:true}).then(() => {
    start(PORT);
})

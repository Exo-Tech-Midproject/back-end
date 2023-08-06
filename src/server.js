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
const physQaRouter = require("./routes/qaRoute/physQaRoute")
const groupRouter = require("./routes/groupsRouter/groupsRouter")

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
app.use(physQaRouter)
app.use(diseaseRouter)
app.use(groupRouter)




// ErrorHandlers ------------------------------------
app.use(notFound);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}

module.exports = {start,app}
require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler')
const dbConnection = require('./config/dbConnection');
const mongoose = require('mongoose');


// const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;



dbConnection()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use(errorHandler)
app.use('/api/contact', require('./routes/contactRoutes') )
app.use('/api/user', require('./routes/userRoutes'));


app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})
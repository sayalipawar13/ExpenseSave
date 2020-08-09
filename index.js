const express= require('express');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'});

connectDB();

const expenses=require('./routes/expense');

const app=express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/expenses',expenses);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running on ${PORT}`));
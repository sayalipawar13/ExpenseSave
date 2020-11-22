const express= require('express');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const cookieSession=require('cookie-session');
const passport=require('passport');
const cors=require('cors');
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'});

connectDB();

const auth=require('./routes/auth');
const passportSetup=require('./config/passport-setup');

const expenses=require('./routes/expense');

const app=express();

app.use(cors());

app.use(cookieSession({
    maxAge:12*60*60*1000,
    keys:[process.env.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',auth);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/expenses',expenses);

const PORT = process.env.PORT || 5000;


app.listen(PORT,console.log(`Server running on ${PORT}`));
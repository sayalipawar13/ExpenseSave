const express= require('express');
const dotenv=require('dotenv');
const passport=require('passport');
const session=require('express-session');
const cors=require('cors');
const connectDB = require('./config/db')
const GoogleStrategy = require('passport-google-oauth20');


dotenv.config({path:'./config/config.env'});

connectDB();

const auth=require('./routes/auth');
const passportSetup=require('./config/passport-setup');

const expenses=require('./routes/expense');

const app=express();

app.use(express.json());

app.use(cors());

app.use(session({
    secret:process.env.secret,
    resave:true,
    saveUninitialized:true,
}));

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',auth);

// app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/expenses',expenses);

const PORT = process.env.PORT || 5000;


app.listen(PORT,console.log(`Server running on ${PORT}`));
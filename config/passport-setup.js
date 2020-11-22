const passport = require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const User=require('../models/user');

passport.serializeUser((user,done)=>{
   done(null,user.id);
})

passport.deserializeUser((id,done)=>{
   User.findById(id).then((user)=>{
      done(null,user.id);
   })
  
})

passport.use(
   new GoogleStrategy({
    callbackURL:'/auth/google/redirect',

clientID:process.env.clientID,
clientSecret:process.env.clientSecret
   },(accessToken,refreshToken,profile,done)=>{
//console.log(profile.emails[0].value);

//check if user already exists
User.findOne({googleId:profile.id}).then((currentUser)=>{
if(currentUser){
//already the user exists
console.log('exists');
done(null,currentUser);
}
else{
   new User({
      username:profile.emails[0].value,
      googleId:profile.id
   }).save().then((newUser)=>{
      console.log(newUser);
      done(null,newUser);

   })
}

}) 


   })
)

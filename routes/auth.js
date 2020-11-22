const express=require('express');
const router=express.Router();
const passport=require('passport');

router.get('/login',(req,res)=>{
    res.json('login');

})

router.get('/google',passport.authenticate('google',{
    scope:['email']
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    //console.log(req.user);

    res.redirect('http://localhost:3000/');
    // res.send(req.user);
})

router.get('/user',(req,res)=>{
    res.json(req.user);
})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect("http://localhost:3000/");
    
})
module.exports=router;
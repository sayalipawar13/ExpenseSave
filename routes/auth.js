const express=require('express');
const router=express.Router();
const passport=require('passport');

router.get('/user',(req,res)=>{
    console.log(req.user);
    res.send(req.user);

})

router.get('/google',passport.authenticate('google',{
    scope:['email']
}));

//callback route for google to redirect to
router.get('/google/redirect',
passport.authenticate('google',{failureRedirect:"/login"}),(req,res)=>{
    //console.log(req.user);

    res.redirect('http://localhost:3000/');
    // res.send(req.user);
})

// router.get('/user',(req,res)=>{
//     res.json(req.user);
// })

router.post('/logout',(req,res)=>{
    if(req.user){
        req.logOut();
         return res.status(200).send("Successfully logout")
        // res.redirect("http://localhost:3000/");
    }
    else{
        return res.status(500).send("Server error")
    }
   
    
})
module.exports=router;
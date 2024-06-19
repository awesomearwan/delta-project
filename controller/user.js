const User = require("../models/user.js");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/user.ejs");
};

module.exports.signUp = async(req,res)=>{ 
    try{
        let {username,password,email} = req.body;
        const newUser =  new User({username,email});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
               return next(err);
            }
            req.flash("success","User register successfully");
        res.redirect("/listing");
        });
        
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
   
};

module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.logIn = async(req,res)=>{ 
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
     res.redirect(redirectUrl);
   
};

module.exports.logOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out!")
       res.redirect("/listing")
    });

};
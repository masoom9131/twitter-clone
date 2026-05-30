// const express=require('express');
// const bodyParser=require('body-parser');
// const app=express();        //express call

// var loginSta=false;
// var isAdmin=0;

// app.set('view engine', 'ejs');    //to use ejs

// ////Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Middleware to parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get("/",function(req,res){    //landing page req
//     res.render('login');
// });

// //get request of adash
// app.get("/adash",function(req,res){
//     if(loginSta==true && isAdmin==1){
//         res.render('dashboardAdmin'); 
//     }
//     else{
//         res.redirect("/");
//     }
// })

// //get request of udash
// app.get("/udash",function(req,res){
//     if(loginSta==true){
//         res.render('dashboard');
//     }
//     else{
//         res.redirect("/");
//     }
// })

// //backend of login system admin and user both
// app.post("/",function(req,res){
//     var username=req.body.uname;
//     var pwd=req.body.pwd;
//     if(username=="admin" && pwd=="admin"){
//        loginSta=true;
//        isAdmin=1;
//        res.redirect("/adash");
//     }
//     else if(username=="user" && pwd=="user"){
//         loginSta=true;
//         res.redirect("/udash");
//     }
//     else{
//         res.redirect("/");
//     }
// });













app.listen(3000,function(req,res){
    console.log("server started at 3000");
})
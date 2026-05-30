const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const session = require('express-session');
const moment=require('moment');
require('moment-duration-format');

// var loginSta=false;
// var isAdmin=0;

//Database of login and reg
var name=['','','','',''];
var email=['','','','',''];
var Acc =['admin','pari','user','rakesh','purjit'];
var Pwd=['admin','pari','user','rakesh','purjit'];
var admin=[1,1,0,0,0];

// var Search=['','',''];

//Database of posts
var posts=['This is my first post as an user','This is my first post as an admin','test'];
var postedby=['user','admin','user'];
var PostedT=['','',''];
var Like=['10','140',''];
var likedBy=['','',''];
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//use ejs
app.set('view engine', 'ejs');

 
//middleware to parse json ki body
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


// welcome page request 
app.get("/",function(req,res){
    req.session.destroy();
    res.render("login");
})

//likes backend

app.get("/like/:id",function(req,res){
    console.log(req.params.id);
    Like[req.params.id]=Number(Like[req.params.id]+1);
    res.redirect("/home")
    
});


app.get("/profile",function(req,res){
    if(req.session.loginSta==true){
        var newpost=[];
        for (var i=0;i<=postedby.length;i++){
        if(req.session.user==postedby[i])
                newpost.push(posts[i])
        }
        
        res.render('profile',{uname:req.session.user,post:newpost});
    }
            
});
 

//signup or regestration page
app.get("/reg",function(req,res){     //change
    res.render('signup');
})

//logout page
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/");
})


//post of /reg
app.post("/reg",function(req,res){
    var username=req.body.uname;
    var password=req.body.pwd;
    var fname=req.body.name;
    var remail=req.body.email;
    var cpassword=req.body.cpwd;
    if(cpassword=password){
        name.push(fname);
        email.push(remail);
        Pwd.push(password);
        Acc.push(username);
        admin.push(0);
        res.send("OK");
    }
    else{
        res.send("TRY AGAIN");
    }
    console.log(Acc);
})

//get of landing page

app.get("/home",function(req,res){
    var agoStamp=[]
    for(var i=0;i<posts.length;i++){
        const timestamp=moment(PostedT[i],'D/M/YYYY,h:mm:ss a');

        //calculate the duration between the timestamp and now
        const duration=moment.duration(moment().diff(timestamp));

        //format the duration into  a human-readable relative time
       const FormattedTimeAgo=duration.format();
        agoStamp.push(FormattedTimeAgo);
    }
    res.render("landingpage",{posts:posts,postedby:postedby,PostedT:agoStamp,Like:Like});
})

//post create krne ke liye
app.post("/post",function(req,res){
    var post=req.body.post;
    var timestamp=new Date().toLocaleString();
    posts.push(post);
    PostedT.push(timestamp);
    postedby.push(req.session.user);
    Like.push(0)
    res.redirect("/home");
})

//get req of adash
app.get("/adash",function(req,res){
    if(req.session.loginSta==true && req.session.isAdmin==1){
        res.render("dashboardAdmin",{posts:posts,postedby:postedby});
    }
    else{
        res.redirect("/");
    }
});

//getting udash 
app.get("/udash",function(req,res){
  if(req.session.loginSta==true){
    res.render("dashboard");
  }
  else
    res.redirect("/");
})

app.post("/search",function(req,res){

        var item=req.body.text;
        var newa=[]
        for(var i=0;i<Acc.length;i=i+1){
        if(item==Acc[i]){
            
            newa.push(Acc[i]);
        }
    }
    res.render('se',{acc:newa});
});
//for getting username password
//backend of login
app.post("/login",function(req,res){
    var username=req.body.uname;
    var pwd=req.body.pwd;
    console.log(username);
    console.log(pwd);

    for(let i =0;i<Acc.length;i++){
        if(username==Acc[i] && pwd==Pwd[i]){
            if(i==i){
            req.session.loginSta=true;
            req.session.isAdmin=admin[i];
            req.session.user=Acc[i];
            }
        }
        
    }
    if(req.session.isAdmin==1 && req.session.loginSta==true){
        res.redirect("/adash");
    }
    else if (req.session.loginSta==true){
        res.redirect("/udash");
    }
    else{
        res.redirect("/");
    }
 
 //admin
    // if(username=="admin" && pwd=="admin"){
    //     req.session.loginSta=true;
    //     req.session.isAdmin=1;
    //     res.redirect("/adash");
    // }
    // else if (username=="user" && pwd=="user"){
    //     req.session.loginSta=true;
    //     res.redirect("/udash");
    // }
    // else{
    //     res.redirect("/");
    // }
})

app.listen(3000,function(req,res){
    console.log("Server is working");
})
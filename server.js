const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partial');

hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('streamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log('Unable to append into a file');
        }
    });
    next();
});


// app.use((req,res,next)=>{
//     res.render('maintaince.hbs'); 

// });
app.use(express.static(__dirname + '/public'));
 
app.get('/project',(req,res)=>{
 res.render('project.hbs',{
     pageTitle: 'Project page',
     message :'this is my project Page'
      })
});
app.get('/',(req,res)=>{

 
    res.render('home.hbs',{
      pageTitle: 'Home Page',
           welcomeMessage: 'Hello Welcome to new Website'
    });
});

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle: 'About page',
     }); 
});

app.get('/bad',(req,res)=>{
   res.send({
       errorMessage: 'Unable to handle request'
   });
});

app.listen(port,()=>{
   console.log(`Server is upon ${port}`);
});
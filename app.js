require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(express.json());
app.use(require('body-parser').urlencoded({extended:true,limit:'100mb'}));
app.use(require('body-parser').json({limit:'100mb'}));
app.set('view engine','ejs');
app.use(express.static("public"));


app.get('/login',(req,res)=>{
  res.render('login');
});
app.get ('/register',(req,res)=>{
    res.render('register');
})

app.listen(process.env.PORT,()=>{
    console.log('heared on ' + process.env.PORT);
});
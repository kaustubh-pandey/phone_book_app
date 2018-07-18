const express = require('express');
const hbs=require('hbs');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {User}=require('./models/User');

var port=3000;

var app=express();
//////////////////////////////////////////
//to get POST data from .hbs form submit.hbs
app.use(bodyParser.urlencoded({
    extended: true
}));
///////////////////////////////////////////
app.use(bodyParser.json());
app.set('view engine','hbs');
//routes
app.get('/',(req,res)=>{
  res.redirect('/user');
});

app.get('/submit',(req,res)=>{
  res.render('submit.hbs');
});
app.post('/user',(req,res)=>{
  //console.log(req.body);
  var user = new User({
    name:req.body.name,
    phone:req.body.phone
  });

  user.save().then((doc)=>{
    res.redirect('/user');
  },(e)=>{
    res.status(400).send();
  });
});

app.get('/user',(req,res)=>{
  User.find({}).then((users)=>{
    var users_info=[];
    var i=0;
    for(i=0;i<users.length;i++){
      var obj={
        name:users[i].name,
        phone:users[i].phone
      }
      users_info.push(obj);
    }
    res.render('home.hbs',{users_info});
  },(e)=>{
    res.status(400).send(e);
  });
});
app.listen(port,()=>{
  console.log(`Server running on PORT ${port}`);
});

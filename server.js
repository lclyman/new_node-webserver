const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// helper functions ********************
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

//write to server.log
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log!');
    }
  });

  next();
});

// maintenance middleware ***********************

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle: 'Site not available',
//     welcomeMessage: `The website is currently being updated.We'll be back soon!`
//   });
// });

app.use(express.static(__dirname + '/public'));

// views *************************

app.get('/', (req, res) => {
  
  res.render('home.hbs', {
    pageTitle: 'Hello Express!',
    welcomeMessage: 'Welcome to my website!!',
    name: 'Larry Clyman',
    age: 61,
    likes: ['this','that'],
  });
});

app.get('/about', (req, res) => {

  res.render('about.hbs', {
    pageTitle: 'About Page',
  });

});

app.get('/projects', (req, res) => {
  
    res.render('projects.hbs', {
      pageTitle: ' My Projects',
    });
  
  });
dfdf
app.get('/contact', (req, res) => {
  
    res.render('contact.hbs', {
      pageTitle: 'Contact Page',
    });
  
  });

app.get('/login', (req, res) => {
  
    res.render('login.hbs', {
      pageTitle: 'Login Page',
    });
  
  });

app.get('/help', (req, res) => {

  res.render('help.hbs', {
    pageTitle: 'Help Page',
  });

});

//start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
/*jshint esversion: 6 */
/* jshint node: true */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials'); //handlebar partial files
// middleware
app.set('view engine', 'hbs');  // set some various express configs, KV pair, view engine = hbs
//views folder is default express folder for templates

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
}); // This middleware example has access to the req and res bodies that are used when accessing a page
// The next function is called to end the middleware, or else we'll hang

// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public')); //dirname points to current directory of main project

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
}); // a function to be used in an hbs template that is called "getCurrentYear"

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//setting route handlers

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Andrew',
    //     likes: ['chicken', 'nuggets']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hey there, this is the express server doing stuff :) !'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });    // use render, automatically looking in views folder for hbs file
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill this request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

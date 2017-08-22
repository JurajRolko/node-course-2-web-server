const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;
    fs.appendFile('server.log', log, (err) => {
        if (err){
            console.log('Unable to append to server log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>');
    //res.send({ name: 'Juraj', likse: ['coding', 'lurking'] });
    res.render('home.hbs', {
        pageTitle: 'About page h1',
        welcomeMessage: 'Welcome, this is an index page'
    });
});

app.get('/about', (req, res) => {
    //res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About page h1'
    });
});

app.get('/projects', (req, res) => {    
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'bad request' });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
const express = require('express');
const colors = require ('colors');  

// Constants
const hostname = '0.0.0.0';
const port = 8080;

// App
const app = express();

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});
  
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

// GET method route
app.get('/secret', function (req, res, next) {
    res.send('GET request to the secret route');
    console.log('This is a console.log message.'.bgMagenta);
});


app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`.green);


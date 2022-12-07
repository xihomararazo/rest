const express = require('express');
const colors = require ('colors');  
const mongodb = require('mongodb') 

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

/*
Your implementation here 
*/

// // Connect to mongodb server
const MongoClient = mongodb.MongoClient;
// /* Your url connection to mongodb container */
var url = 'mongodb://localhost:27017/';

// GET method route
// Retrieve all documents in collection
app.get('/docs/all', function (req, res) {
    MongoClient.connect(url, function(err, db){
        if (err) throw err;

        var database = db.db('my-test-db');
        var query = {};

        database.collection('patients').find(query).toArray(function(err, result) {
            if (err) throw err;
            if(result.length > 0) {
                console.log(result);
                res.status(200).send(result);
                db.close();
            } else {
                console.log('Patients is emty'.red);
                res.status(200).send('Patients is emty.');
                db.close();
            }
        })
    });
});
  

// GET method route
// Query by hostname
app.get('/query', function (req, res) {
    let name = req.query.name;

    if ( name == undefined) {
        res.status(400).send('No name provided.');       
    } else {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var database = db.db('my-test-db');
            var query = {name:name};
          
            database.collection('patients').find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                if(result.length > 0) {
                    console.log(result);
                    res.status(200).send(result);
                    db.close();
                } else{
                    console.log('No patient with this name'.red);
                    res.status(402).send('No patient with this name.');
                    db.close();
                }
            
            })
        });
    }
});

/* PUT method. Modifying the message based on host. 
If not found, create a new document in the database. (201 Created)
If found, message, date and offset is modified (200 OK) */
app.put('/query', function (req, res) {

    let name = req.query.name;
    let age = req.query.age;
    let height = req.query.height;
    let weight = req.query.weight;
    
    if (name == undefined || age == undefined || height == undefined || weight == undefined) {
        res.status(400).send('Some parameters are not provided.');
    } else {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            
            var database = db.db('my-test-db');
        
            var query = {
                name:name
            };
        
            const updateDoc = {
                $set: {
                    age:age,
                    height:height, 
                    weight:weight
                }
            };
            // this option instructs the method to create a document if no documents match the filter
            const options = {upsert: true};

            database.collection('patients').updateOne(query, updateDoc, options)
                .then((result) => {
                    console.dir(result);
                    if(result.matchedCount > 0) {
                        res.status(200).send('Updated'); 
                    } else {
                        res.status(201).send('Created');
                    }
                    db.close();
                }) .catch((err) => {
                    console.log('Error: ' + err);
                    db.close();
                });
        });
    }
});

/* DELETE method. Modifying the message based on hostname. 
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
app.delete('/query', function (req, res) {
    let name = req.query.name;
    if ( name == undefined){
        res.status(400).send('No name provided');
                
    }else{
        MongoClient.connect(url, function(err, db){
            if (err) throw err;
            var database = db.db('my-test-db');
            var query = {name:name};
            database.collection('patients').deleteMany(query)
            .then((result) => {
                console.dir(result);
                if(result.deletedCount > 0) {
                    res.status(200).send('Deleted.'); 
                } else {
                    res.status(204).send('No patient with this name.');
                }
                db.close();
            }).catch((err) => {
                console.log('Error: ' + err);
                db.close();
            });
        });
    }
});

app.listen(port, hostname, function() {
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var database = db.db('my-test-db');
      
        database.collection('patients').countDocuments().then((count) => {
            console.log(count);
            if(count == 0) {

                const docs = [
                    {name:'Xihomara', age:20, height:1.65, weight:65},
                    {name:'Arturo', age:40, height:1.85, weight:70},
                    {name:'Brenda', age:33, height:1.6, weight:77},
                    {name:'Martha', age:21, height:1.75, weight:76},
                    {name:'Pablo', age:34, height:1.2, weight:65},
                    {name:'Valeria', age:53, height:1.5, weight:68},
                    {name:'Jorge', age:33, height:1.65, weight:55},
                    {name:'Pedro', age:22, height:1.6, weight:55},
                    {name:'Juan', age:26, height:1.7, weight:45},
                    {name:'Camila', age:28, height:1.8, weight:55},
                    {name:'Oscar', age:27, height:1.7, weight:65},
                    {name:'Fabian', age:27, height:1.75, weight:55},
                    {name:'Violeta', age:28, height:1.65, weight:75},
                ];

                database.collection('patients').insertMany(docs, function(err, res) {
                    if (err) throw err;
                    console.log(myobj);
                    console.log('Document inserted in database.');
                    db.close();
                });
            }
          }).catch((err) => {
            console.log(err.Message);
          });
      
       
    });
  });

console.log(`Running on http://${hostname}:${port}`.green);


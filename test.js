const colors = require ('colors'); 
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
                                 res.writeHead(200,{'Content-Type': 'text/html'});
                                 //res.statusCode = 200; // type of response 
                                 //res.setHeader('Content-Type', 'text/html'); // type of response
                                 res.end('Hello World test!\n'); //end action
                                 });
                                 
server.listen(port, hostname, () => {
                        console.log(`Server running at http://${hostname}:${port}/`.green);
                      });
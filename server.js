const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    // LODASH
    const num = _.random(0,20);
    console.log(num);

    const greet = () => {
        console.log('Hello All Day All Night');
    };
    // convert to run once only!!
    const greet_lodash = _.once(() => {
        console.log('Hello');
    });

    greet();
    greet();
    greet_lodash();
    greet_lodash();

    // Deals with Requests
    console.log("REQUEST RECEIVED");
    // console.log(req.url, req.method);

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/': // ROOT
            path += 'index.html';
            res.statusCode = 200; // everything OK
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200; // everything OK
            break;
        case '/about-me':
            res.statusCode = 301; // resource permanenet redirect
            res.setHeader('Location','/about')
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404; // not Found
            break;
    }

    // res.write('<head><link rel="stylesheet" href="#"</head>')
    // res.write('<h1>Hello World!!<h1>');
    // res.write('<p>From Gorve!!<p>');
    
    // send an html file
//  fs.readFile('./views/index.html', (err, data) => {
    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            res.end(); // keep otherwise hanging.
            
        } else {
            // res.write(data); // FOR MUTLIPLE DATA
            // res.end();
            res.end(data);
        }
    })
    // res.end();
});

server.listen(3000, 'localhost', () => {
    // this func is fired when we start listening
    console.log("Listening on Port 3000 for Requests");
});

// RUN THIS FILE, AND RUN  `localhost:3000` on broswer, you will get message on console that you have received a request.


/* LocalHost:
    - loopback IP address 127.0.0.1 
    - it points directly back to own computer
    - when we're connecting to the local host domain in a browser the browser is actually connecting back to our own computer 
      which is then acting as a host for our website so the host name local host means listen for requests coming to our own 
      computer and this is how we use our own computer as a host when we're developing a website

*/

/* Port Number: localhost:3000
    - Port number represents a specific channel gateway on our computer that a certain bit of software, our server should communicate
    - Different software that connects to the internet needs different port numbers to keep info separate.
    - Doors into your computer through which internet communications can be made to different programs.
    - Our server needs its own port number, common one is 3000 for local web development 
    - localhost we also type the port number.
*/
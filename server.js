const http = require("http"); //HTTP module
const fs = require('fs');
const _ = require('lodash');



const server = http.createServer((req, res) => {
    // loadash
    const number = _.random(1,20);
    console.log(number);
    const greet = _.once(() => {
        console.log('hello');
    })
    console.log(greet());
    let path = './views/';  //basic routing, connecting your pages
    switch(req.url){
        case '/':
        path += "index.html"; 
        res.statusCode = 200;
        break;
        case '/about':
        path += '/about.html';
        res.statusCode = 200;
        break;
        case '/about-me':
        res.statusCode = 301;
        res.setHeader('Location', '/about'); //redirecting from non existing page to existing
        res.end()
        break;
        default:
        path += '/404.html';
        res.statusCode = 404;  //sending status codes to browser
        break;
    }
    //set header content type
    res.setHeader('Content-Type', 'text/html');
    //send the HTML file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
          //  res.write(data); // no need to use when sending single stuff
            res.end(data) // for one stuff better solution
        }
    });
})

server.listen(8000, 'localhost', () => {
    console.log("listening for req on port 8000");
})
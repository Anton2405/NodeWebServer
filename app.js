const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3500
//localhost:3500

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
};

function staticFile(res, filePath, ext) {
    res.setHeader('Content-type', mimeTypes[ext]);
    fs.readFile('./public' + filePath, {}, (error, data) => {

        if (error) {
            res.statusCode = 404;
            res.end();
        }
        res.end(data);
    })
}

http.createServer((req, res) => {
    const url = req.url;
    console.log(url);
    switch (url) {
        case '/contact':
            console.log('contact page');
            staticFile(res, '/contact.html', '.html');
            break;
        default:
            const extname = String(path.extname(url)).toLocaleLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, url, extname);
            }
            else {
                res.statusCode = 404;
                res.end();
            }

            break;
    }
}).listen(PORT);
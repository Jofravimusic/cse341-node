const http = require('http');
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Francisco Aguirre');
});

server.listen(3000);
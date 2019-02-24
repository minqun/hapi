var http=require('http');
var server=http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('Hello SKL\n');
})
server.listen(8081);
console.log('Server running at http://118.89.56.230:8081');

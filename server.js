let serveStatic = require('serve-static');
let http = require('http');

// Serve up the public folder
let serve = serveStatic('public', {'index': ['index.html', 'index.htm']})

// Create server
let server = http.createServer(function onRequest (req, res) {
    serve(req, res, undefined)
})

// Listen
server.listen(3000)
var connect = require('connect');
var port = process.argv[2];
connect.createServer(
    connect.static(__dirname)
).listen(port);
var sys = require('sys');
var http = require('http');
var url = require('url');

//require custom dispatcher
var dispatcher = require('./lib/dispatcher.js');

var host = '0.0.0.0';
var port = process.env.C9_PORT;

console.log('Starting server @ http:/' + host + '/:'+port+'/');
 
http.createServer(function (request, response) {
  //wrap calls in a try catch
  //or the node js server will crash upon any code errors
  try {
    //pipe some details to the node console
    console.log('Incoming Request from: ' +
                 request.connection.remoteAddress +
                ' for href: ' + url.parse(request.url).href
    );
 
    //dispatch our request
    dispatcher.dispatch(request, response); 
 
  } catch (err) {
    //handle errors gracefully
    sys.puts(err);
    response.writeHead(500);
    response.end('Internal Server Error');
  }  
 
}).listen(port, host, function() {
  //runs when our server is created
  console.log('Server running at http://'+host+':' + port + '/');
});
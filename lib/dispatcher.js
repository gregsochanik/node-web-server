var fs = require('fs');
var sys = require('sys');
var endpoints = require('./actions.js');
var renderer = require('./renderer.js');

this.dispatch = function(req, res) { 

  var parts = req.url.split('/');
 
  if (req.url == "/") {
    fs.readFile('./webroot/index.html', function(error, content) {
      if (error) {	    
        renderer.serverError(sys, res, 500, '500 Internal Server Error');
      } else {
        renderer.renderHtml(sys, res, content);
      }
    });
 
  } else {
    var action   = parts[1];
    var argument = parts[2];
 
    var selectedEndpoint = endpoints.endpointList[action];
 
    if (typeof selectedEndpoint == 'function') {
      var content = selectedEndpoint(argument);
      renderer.renderHtml(sys, res, content);
    } else {
      renderer.serverError(sys, res, 404, '404 Not Found');
    }    
  }
};
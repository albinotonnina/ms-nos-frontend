'use strict';

var express = require('express');
var app = express();

var dyson = require('dyson');

dyson.bootstrap({
    configDir: __dirname + '/static',
    port: 3000
});

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

app.get("/admin/*", function(req, res){
    apiProxy.web(req, res, { target: 'http://localhost:3000' });
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build/dist'));

app.listen(app.get('port'), function() {
  //console.log("Node app is running at localhost:" + app.get('port'));
});

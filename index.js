'use strict';

var express = require('express');
var app = express();
var dyson = require('dyson');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var apiTargetHost = 'http://localhost:3000';

dyson.bootstrap({
    configDir: __dirname + '/static',
    port: 3000
});

app.get("/admin/*", function(req, res){
    apiProxy.web(req, res, { target: apiTargetHost });
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build/dist'));

app.listen(app.get('port'));

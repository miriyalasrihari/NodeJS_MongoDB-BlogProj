'use strict';

var httpProxy = require('http-proxy');

var targets = {
    'nodeServer' : {
        host : 'localhost',
        port : 8080
    }
};

var proxyPort = 80;

var proxyServer = httpProxy.createServer(function(req, res, proxy) {
    proxy.proxyRequest(req, res, targets.nodeServer);
}).listen(proxyPort);
'use strict';

var cluster = require('cluster');
var os = require('os');
var server = require('./server');
var logger = require('../corelibs').logger;

if (cluster.isMaster) {
    var idx = 0;
    for (idx; idx < os.cpus().length; idx++) {
        cluster.fork();
    }
    cluster.on('fork', function(worker) {
        logger.debug("forking worker: #" + worker.id + " ("
            + worker.process.pid + ")");
    });
    cluster.on('online', function(worker) {
        logger.debug("worker #" + worker.id + ' is online');
    });
    cluster.on('listening', function(worker, address) {
        logger.info("worker #" + worker.id + " is connected to "
            + address.address + ":" + address.port);
    });
    cluster.on('disconnect', function(worker, address) {
        logger.error("worker #" + worker.id + " has dis-connected");
    });
    cluster.on('exit', function(worker, code, signal) {
        logger.debug('worker #' + worker.id + ' has exited with code: '
            + worker.process.exitCode);
        cluster.fork();
    });
} else {
    server();
}

'use strict';

var winstonLogsConfig = {
    levels : {
        'debug' : 0,
        'info' : 1,
        'warn' : 2,
        'error' : 3,
        'trans' : 4
    },
    colors : {
        'debug' : 'blue',
        'info' : 'cyan',
        'warn' : 'yellow',
        'error' : 'red',
        'trans' : 'green'
    }
};

var winstonLogLevel = 'debug';

var winstonConfig = {
    'level' : winstonLogLevel,
    'levels' : winstonLogsConfig.levels
};
var winstonTransports = {
    'Console' : {
        'timestamp' : true,
        'level' : winstonLogLevel,
        'levels' : winstonLogsConfig.levels,
        'colorize' : true
    }
};

exports.winstonLogsConfig = winstonLogsConfig;
exports.winstonConfig = winstonConfig;
exports.winstonTransports = winstonTransports;

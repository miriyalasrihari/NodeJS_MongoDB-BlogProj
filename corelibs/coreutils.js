'use strict';

var config = require('../config');
var winston = require('winston');

// setup global logger
winston.remove(winston.transports.Console);
winston.addColors(config.winstonLogsConfig.colors);
var logger = new (winston.Logger)(config.winstonConfig);
logger.add(winston.transports.Console, config.winstonTransports.Console);

// exports
exports.logger = logger;

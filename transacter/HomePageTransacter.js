'use strict';

var dal = require('../dal');
var DAL = dal.DAL;
var logger = require('../corelibs').logger;
var async = require('async');

function HomePageTransacter() {

};
HomePageTransacter.prototype.CREATE = function HomePageTransacterCreate(req,
    res, next) {
    var db = new DAL(), attrs = {};
    attrs.Timestamp = new Date(req.body.Timestamp);
    attrs.Count = 7;
    async.waterfall([
            function(callback) {
                db.doReportsOperation("USER_GETPOSTSBYCOUNT", attrs, function(
                    error, result) {
                    if (error === null && result.constructor === Array) {
                        return callback(null, result);
                    }
                    return callback(error, result);
                });
            } ], function(error, result) {
        if (error === null) {
            logger.info("HomePageTransacterCreate - done...");
            return res.end(JSON.stringify(result));
        }
        logger.error("HomePageTransacterCreate - ERROR (:~ ");
        throw (new Error(error));
    });
};
HomePageTransacter.prototype.READ = function HomePageTransacterRead(req, res,
    next) {
    var db = new DAL(), attrs = {}, homeResponse = {};
    attrs.Timestamp = new Date();
    attrs.Count = 5;
    async.waterfall([
            function(callback) {
                db.doReportsOperation("USER_GETPOSTSBYCOUNT", attrs, function(
                    error, result) {
                    if (error === null && result.constructor === Array) {
                        homeResponse.AllPosts = result;
                        return callback(null, homeResponse);
                    }
                    return callback(error, result);
                });
            }, function(homeResponse, callback) {
                db.doReportsOperation("USER_GETPOPULARPOSTSBYCOUNT", {
                    Count : 5
                }, function(error, resul) {
                    if (error === null) {
                        homeResponse.Posts = resul;
                        return callback(null, homeResponse);
                    }
                    return callback(error, resul);
                });
            } ], function(error, result) {
        if (error === null) {
            logger.info("HomePageTransacterRead - done...");
            return res.render("hometemplate", result);
        }
        logger.error("HomePageTransacterRead - ERROR (:~ ");
        throw (new Error(error));
    });
};
module.exports = HomePageTransacter;
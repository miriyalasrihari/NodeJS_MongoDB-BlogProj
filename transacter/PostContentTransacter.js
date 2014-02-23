'use strict';

var dal = require('../dal');
var DAL = dal.DAL;
var generateUUID = dal.GenerateUniqueID;
var async = require('async');
var logger = require('../corelibs').logger;
var path = require('path');
var fs = require('fs');

function PostContentTransacter() {

};
PostContentTransacter.prototype.CREATE = function PostContentTransacterCreate(
    req, res, next) {
    var tempPath, db = new DAL(), attrs = {}, idx = 0;
    attrs.Date = new Date();
    attrs.Author = req.body.Author;
    attrs.Title = req.body.Title;
    attrs.Post = req.body.Post;
    attrs.Type = req.body.Type;
    attrs.Comments = [];
    attrs.Likes = 0;
    if (req.body.Tags) {
        attrs.Tags = (req.body.Tags).trim().split(",");
        for (idx; idx < attrs.Tags.length; idx++) {
            attrs.Tags[idx] = (attrs.Tags[idx]).trim();
        }
    }
    async.waterfall([ function(callback) {
        tempPath = req.files.Image.path;
        fs.readFile(tempPath, function(err, original_data) { 
            if (err === null) {
                attrs.Image = new Buffer(original_data, 'binary').toString('base64');
            }
            fs.unlink(tempPath, function(err) {
                if (err){
                    throw err;
                    return;
                };
                return callback (null);
            });
        });
    }, function(callback) {
        db.doAccountsOperation("USER_SAVEPOST", attrs, callback);
    } ], function(wfError, efResult) {
        if (wfError === null) {
            logger.info("PostContentTransacterCreate - done...");
            return res.render("postcontenttemplate", {
                Message : "Successfully Posted..."
            });
        }
        logger.error("PostContentTransacterCreate - ERROR (:~ ");
        throw (new Error(wfError));
    });
};
PostContentTransacter.prototype.READ = function PostContentTransacterRead(req,
    res, next) {
    logger.info("PostContentTransacterRead - done...");
    return res.render("postcontenttemplate", {
        Message : ""
    });
};
module.exports = PostContentTransacter;
'use strict';

var dalutils = require('./dalutils');
var CONSTANT_STRING = "MRIYJLSHKN";

function Reports() {

}

var getPopularPostsByCount = function getPopularPostsByCount(attributes,
    callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance;
    reqAttrs = [ 'Count' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    db.posts.find({}, {
        _id : 0,
        Title : 1,
        PostID : 1
    }).sort({
        Likes : -1
    }).limit(attributes.Count, function(error, result) {
        if (error === null) {
            return callback(null, result);
        }
        return callback(error, false);
    });
};

var getPostsByCount = function getPostsByCount(attributes, callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance;
    reqAttrs = [ 'Count', 'Timestamp' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    db.posts.find({
        Date : {
            $lt : new Date(attributes.Timestamp)
        }
    }, {
        _id : 0,
        Title : 1,
        PostID : 1,
        Author : 1,
        Date : 1,
        Image : 1,
        ShortPost : 1
    }).sort({
        Date : -1
    }).limit(attributes.Count, function(error, result) {
        if (error === null) {
            return callback(null, result);
        }
        return callback(error, false);
    });
};

var getPostsByCountAndTime = function getPostsByCountAndTime(attributes,
    callback) {
    var reqAttrs, index = null, value, db = dalutils.OpenDBInstance, finalResult = [], idx = 0;
    reqAttrs = [ 'PostID', 'Count', 'Timestamp' ];
    for (index in reqAttrs) {
        if (reqAttrs.hasOwnProperty(index)) {
            value = attributes[reqAttrs[index]];
            if ((value === null) || (value === undefined)) {
                return callback(new Error("attribute " + index
                    + " is not defined"));
            }
        }
    }
    db.posts.aggregate({
        $match : {
            PostID : attributes.PostID
        }
    }, {
        $project : {
            Comments : 1,
            _id : 0
        }
    }, {
        $unwind : "$Comments"
    }, {
        $match : {
            'Comments.Date' : {
                $lt : new Date(attributes.Timestamp)
            }
        }
    }, {
        $sort : {
            'Comments.Date' : -1
        }
    }, {
        $limit : attributes.Count
    }, function(error, results) {
        if (error === null) {
            for (idx; idx < results.length; idx++) {
                finalResult.push(results[idx].Comments);
            }
            return callback(null, finalResult);
        }
        return callback(error, false);
    });
};

Reports.prototype.GetPopularPostsByCount = getPopularPostsByCount;
Reports.prototype.GetPostsByCount = getPostsByCount;
Reports.prototype.GetPostsByCountAndTime = getPostsByCountAndTime;

module.exports = Reports;
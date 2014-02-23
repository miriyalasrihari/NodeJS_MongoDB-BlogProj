'use strict';
var mongojs = require('mongojs');
var database = "MandM";
var ObjectId = mongojs.ObjectId;
var TIMEOUT_DEFAULT = 60; // in seconds


function Singleton_Container() {
    var instance = null;

    function DB() {
        var db = mongojs(database, [ 'posts', 'UUID' ]);
        db.UUID.ensureIndex({
            "Date" : -1
        }, {
            expireAfterSeconds : TIMEOUT_DEFAULT
        });
        return db;
    }

    return {
        getInstance : function() {
            if (instance) {
                return instance;
            }
            return (new DB());
        }
    };
};

var databaseInstance = Singleton_Container();

var generateUniqueID = function generateUniqueID(callback) {
    var db = databaseInstance.getInstance();
    db.UUID.insert({
        Date : new Date()
    }, function(error, result) {
        if (error === null) {
            return callback(null, (result[0]._id).toString());
        }
        return callback(error, result);
    });
};

exports.OpenDBInstance = databaseInstance.getInstance();
exports.GenerateUniqueID = generateUniqueID;
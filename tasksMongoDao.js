"use strict";

//CRUDL for tasks stored on MongoDB
let mongo = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
const URL = `mongodb://${process.env.IP}:27017/data`;


//DAO function to create object.
exports.create = function(id, text, isDone) {
  mongo.connect(URL, function(err, db) {
    if (err) throw err;
    db.collection('tasks').insertOne({_id: new ObjectID(id),text: text,done: isDone}, function(err, result) {
      if (err) throw err;
      console.log('in create()');
      console.log(result);
      db.close();
    });
  });
}

//DAO function to get single object.
exports.read = function(id) {
  mongo.connect(URL, function(err, db) {
    if (err) throw err;
    return db.collection('tasks').findOne({_id: new ObjectID(id)}, function(err, result) {
      if (err) throw err;
      console.log('in read()');
      console.log(result);
      db.close();
    });
  });
}

//DAO function to update object.
exports.update = function(id, text, isDone) {
  mongo.connect(URL, function(err, db) {
    if (err) throw err;
    db.collection('tasks').updateOne({_id: new ObjectID(id)}, {$set:{text: text, done: isDone}}, function(err, result) {
      if (err) throw err;
      console.log('in update()');
      console.log(result);
      db.close();
    });
  });
}

//DAO function to delete object.
exports.delete = function(id) {
  mongo.connect(URL, function(err, db) {
    if (err) throw err;
    db.collection('tasks').deleteOne({_id: new ObjectID(id)}, function(err, result) {
      if (err) throw err;
      console.log('in delete()');
      console.log(result);
      db.close()
    });
  });
}

//DAO function to get a list of objects.
exports.list = function(isDone) {
  mongo.connect(URL, function(err, db) {
    if (err) throw err;
    return db.collection('tasks').find({done: isDone}, function(err, result) {
      if (err) throw err;
      console.log('in list()');
      console.log(result);
      db.close();
    });
  });
}

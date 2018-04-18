'use strict';

const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'contacts';

class Dao {

    connect(url) {
        return mongodb.MongoClient.connect(url).then(db => this.db = db);
    }

    findAll() {
        return this.db.collection(COLLECTION).find().toArray();
    }

    findById(id) {
        id = new ObjectID(id);
        return this.db.collection(COLLECTION).findById({_id:id});
    }

    update(id, data) {
        id = new ObjectID(id);
        data._id = id;
        return this.db.collection(COLLECTION).updateOne({_id:id}, data);
    }

    insert(data) {
        return this.db.collection(COLLECTION).insertOne(data);
    }

    remove(id) {
        id = new ObjectID(id);
        return this.db.collection(COLLECTION).remove({_id:id})
    }

    removeMany(ids) {
        var objectIds = [];
        for (let id of ids) {
            objectIds.push(new ObjectID(id))
        }
        return this.db.collection(COLLECTION).remove({_id: {$in: objectIds}})
    }

    close() {
        if (this.db) {
            this.db.close();
        }
    }
}

module.exports = Dao;
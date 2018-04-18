'use strict';

const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'contacts';

class Dao {

    connect(url) {
        return mongodb.MongoClient.connect(url)
            .then(db => this.db = db);
    }

    findAll(searchString) {
        let query = {};
        if (searchString) {
            query = {
                $or: [
                    {name: {'$regex': searchString, '$options': 'i'}},
                    {phone: {'$regex': searchString, '$options': 'i'}}
                ]
            }
        }
        return this.db.collection(COLLECTION).find(query).toArray();
    }

    findById(id) {
        id = new ObjectID(id);
        return this.db.collection(COLLECTION).findOne({ _id: id });
    }

    update (id, data) {
        id = new ObjectID(id);
        data._id = id;
        return this.db.collection(COLLECTION).updateOne({ _id: id }, data);
    }

    insert (data) {
        return this.db.collection(COLLECTION).insert(data);
    }

    remove(id) {
        id = new ObjectID(id);
        return this.db.collection(COLLECTION).remove({ _id: id }, { justOne: true });
    }

    removeMany(ids) {
        ids = ids.map(item => new ObjectID(item));
        return this.db.collection(COLLECTION).remove({ _id : { $in: ids } });
    }

    close() {
        if (this.db) {
            this.db.close();
        }
    }
}

module.exports=Dao;
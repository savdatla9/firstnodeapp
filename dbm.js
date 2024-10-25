const { MongoClient } = require('mongodb');

let dbConnect;

let uri = 'mongodb://0.0.0.0:27017/test1';

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnect = client.db;
            return callback;
        })
        .catch((err) => {
            console.log(err);
            return callback(err);
        })
    },
    getDb: () => dbConnect,
}
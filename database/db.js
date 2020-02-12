const mongo = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const debug = require('debug')('app:database');

const connectDB = async() => {
    try {
        //connecting to db
        await mongo.connect(db, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        debug('mongoDB Connected');
    } catch (err) {
        debug('db error =>');
        debug(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
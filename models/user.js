const mongoose = require('mongoose');
const MongoSchema = mongoose.Schema;

// Create User Mongo Schema
const UserSchema = new MongoSchema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
const jwt = require('jsonwebtoken');
const config = require('config');
const debug = require('debug')('app:middleware:auth');
const User = require('../models/user');

//custom middleware using JWT
module.exports = async function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).json('not authorized');

    try {
        const decoded = jwt.verify(token, config.get('jwt_secret_key'));
        req.user = decoded;
        //check if the user exists in the system
        debug('user id:', decoded);
        const user = await User.findOne({ id: decoded.user.id });
        debug(user);
        if (user)
            next();
        else
            return res.status(403).json('not registered');
        //next();
    } catch (err) {
        return res.status(400).json('token is not valid');
    }
};
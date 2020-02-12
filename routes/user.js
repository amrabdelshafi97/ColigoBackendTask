const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const debug = require('debug')('app:auth-route.js');
const User = require('../models/user');
const validate = require('../validator/user');

const router = express.Router();

//registering user request
router.post('/', async(req, res) => {

    const validationResult = validate(req.body);
    debug(validationResult);
    if (validationResult.error) {
        return res.status(422).send(validationResult.error);
    }

    const { id, name } = req.body; //extracting id and name from request
    const payload = { // the payload (data) to be encrypted
        user: { id, name }
    };
    jwt.sign(payload,
        config.get('jwt_secret_key'), { expiresIn: "2d" }, // token expires in 2 days
        (err, token) => {
            if (err)
                throw err;
            user = new User({
                id,
                name
            });
            user.save();
            res.status(200).json(token); // to can use it as 'x-auth-token' header for auth
        });
});
module.exports = router;
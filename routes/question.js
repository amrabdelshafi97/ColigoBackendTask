const express = require('express');
const debug = require('debug')('app:question-route.js');
const validate = require('../validator/question').validator;
const quizCollection = require('../models/quiz');
const auth = require('../middleware/auth');

const router = express.Router();

//Add a question to an existing quiz
router.put('/:id', auth, (req, res) => {
    debug('post question route at quiz id');
    const validationResult = validate(req.body);
    if (validationResult.error) {
        return res.status(422).send(validationResult.error);
    }
    const question = req.body;
    const quiz_id = req.params.id;
    try {
        quizCollection
            .findOneAndUpdate({ 'id': quiz_id }, { $addToSet: { 'questions': question } });
        /*,
                    function(err, doc) {
                        if (err) console.error(err);
                        else console.log('pushed');
                    }*/
        res.status(202);
    } catch (err) {
        res.status(500).send('server error');
    }
});

//Remove a question from an existing quiz
router.delete('/:id', auth, (req, res) => {
    debug('delete question route at quiz id');
    try {
        const { body } = req.body;
        const quiz_id = req.params.id;
        quizCollection.update({ 'id': quiz_id }, { $pull: { 'questions': { 'body': body } } });
        res.status(200);
    } catch (err) {
        res.status(500).send('server error');
    }
});
module.exports = router;
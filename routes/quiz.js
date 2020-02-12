const express = require('express');
const debug = require('debug')('app:quiz-route.js');
const Quiz = require('../models/quiz');
const validate = require('../validator/quiz');
const auth = require('../middleware/auth');

const router = express.Router();

//Create a new quiz
router.post('/', auth, async(req, res) => { //Create new Quiz
    debug(req.body);
    try {
        //validation
        const validationResult = validate(req.body);
        debug(validationResult);
        if (validationResult.error) {
            return res.status(422).send(validationResult.error);
        }
        //check if quiz exists
        const { id } = req.body;
        debug('request quiz id :: ', id);
        let quiz = await Quiz.findOne({ id });
        debug('found quiz id :: ', quiz);

        if (quiz) {
            return res.status(409).json('quiz already exists');
        }
        quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).send('quiz successufully added');
    } catch (err) {
        debug(err.message);
        res.status(500).send('server error');
    }
});

//Listing all quizzes
router.get('/', async(req, res) => { //List all Quizes
    try {
        const quizesList = await Quiz
            .find()
            .select('id name date topic');
        res.status(
            ((quizesList === undefined || quizesList.length == 0) ? 204 : 200)
        ).send(quizesList);
    } catch (err) {
        debug(err.message);
        res.status(500).send('server error');
    }
});

//Show the quiz & associated questions
router.get('/:id', async(req, res) => {
    /*if (typeof req.params.id !== 'string')
        return res.status(400).send('bad request');*/
    try {
        const quiz = await Quiz
            .findOne({ id: req.params.id });
        if (quiz)
            res.status(200).send(quiz);
        else
            res.status(404).send('not found');
    } catch (err) {
        debug(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
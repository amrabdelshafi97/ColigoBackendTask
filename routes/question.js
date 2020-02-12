const express = require('express');
const debug = require('debug')('app:question-route.js');
const validate = require('../validator/question').validator;
const Quiz = require('../models/quiz');
const auth = require('../middleware/auth');

const router = express.Router();

//Add a question to an existing quiz --> quiz id
router.put('/quizNo', auth, (req, res) => {
    debug('post question route at quiz id');
    const validationResult = validate(req.body);
    if (validationResult.error) {
        return res.status(422).send(validationResult.error);
    }
    const question = req.body;
    const quiz_id = req.query.id;
    debug(quiz_id);
    try {
        //
        update(quiz_id, question)
            .then(res.status(200).send('added'))
            .catch(res.status(501).send('not found already'));
    } catch (err) {
        res.status(500).send('server error');
    }
});

//Remove a question from an existing quiz
router.delete('/quizNo', auth, (req, res) => {
    debug('delete question route at quiz id');
    try {
        const { body } = req.body;
        debug(body);
        const quiz_id = req.query.id;
        del(quiz_id, body)
            .then(res.status(200).send('deleted'))
            .catch(res.status(501).send('not found already'));
    } catch (err) {
        res.status(500).send('server error');
    }
});

async function update(q_id, ques) {
    let res = await Quiz.findOneAndUpdate({ id: q_id }, { $addToSet: { questions: ques } });
    debug(res);
    return res;
}
async function del(q_id, bdy) {
    let res = await Quiz.findOneAndUpdate({ id: q_id }, { $pull: { questions: { body: bdy } } });
    debug(res);
    return res;
}
module.exports = router;
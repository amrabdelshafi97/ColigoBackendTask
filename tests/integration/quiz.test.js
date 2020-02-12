const request = require('supertest');
const Quiz = require('../../models/quiz');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const debug = require('debug')('app:test')


let server;
let quizes = [{
        id: 'CS111',
        topic: 'OOP',
        questions: [{
                body: 'What is your name ? ',
                category: 'single',
                answers: [
                    'Amr',
                    'Omar',
                    'btngan',
                    'btngnaya'
                ],
                correctAnswer: ['Red']
            },
            {
                body: 'how old are you?',
                category: 'single',
                answers: [
                    '10',
                    '11',
                    '12'
                ],
                correctAnswer: ['12']
            }
        ]
    },
    {
        id: 'CS101',
        topic: 'HTML',
        questions: [{
                body: 'What is your Favourite color ? ',
                category: 'multiple',
                answers: [
                    'Red',
                    'Blue',
                    'Orange',
                    'Green'
                ],
                correctAnswer: ['Red', 'Blue']
            },
            {
                body: 'ay 7aga ?',
                category: 'single',
                answers: [
                    '1',
                    '2',
                    '3'
                ],
                correctAnswer: ['1']
            }
        ]
    }
];

describe('/api/quiz', () => {
    beforeEach(() => { server = require('../../app'); });
    afterEach(async() => {
        server.close();
        await User.remove({});
        await Quiz.remove({});
    });

    describe('GET /', () => {
        it('should return all quizes', async() => {


            await Quiz.collection.insertMany(quizes);

            const res = await request(server).get('/api/quiz');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(q => q.id === 'CS101')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a quiz if valid id is passed', async() => {
            await Quiz.collection.insertMany(quizes);
            let quiz_id = 'CS101';
            let quiz_topic = 'HTML';
            const res = await request(server).get('/api/quiz/' + quiz_id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('topic', quiz_topic);
        });

        it('should return 404 if invalid id is passed', async() => {
            let quiz_id = 'CS0';

            const res = await request(server).get('/api/quizs/' + quiz_id);

            expect(res.status).toBe(404);
        });

        /*it('should return 404 if no quiz with the given id exists', async () => {
          const id = mongoose.Types.ObjectId();
          const res = await request(server).get('/api/quizs/' + id);

          expect(res.status).toBe(404);
        });*/
    });

    describe('POST /', () => {

        let token;
        let quiz;
        let user;

        const exec = async() => {
            return await request(server)
                .post('/api/quiz')
                .set('x-auth-token', token)
                .send({ quiz });
        };

        beforeEach(async() => {
            quiz = quizes[0];
            user = new User({ id: '1234', name: 'Amr' });
            await user.save();
            token = jwt.sign({ id: '1234', name: 'Amr' }, config.get('jwt_secret_key'));
        });
        it('should return 401 if client is not logged in', async() => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

    });
});
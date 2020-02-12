const auth = require('../../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {
            id: 123,
            name: 'user'
        };
        const token = jwt.sign(user, config.get('jwt_secret_key'), { expiresIn: "2d" });
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toMatchObject(user);
    });
});
/* eslint-disable no-console */
const express = require('express');
// load json data
const fakeUsers = require('../public/fake-users.json');

const router = express.Router();
// Router-level middleware examples
// use middleware to access req and res objects
router.use((req, res, next) => {
    const now = new Date().toString();
    console.log('current date', now);
    console.log('req.METHOD', req.method);
    console.log('req.url', req.url);
    next(); // without next(), the request will be left hanging
});

router.use('/favorite', (req, res, next) => {
    res.send({
        path: '/users/favorite',
        message: `When the path matches /users/favorite, end the req-res cycle`,
        result: 'The next/users/favorite routes will not run',
    });
});

router.use('/favorite', (req, res, next) => {
    res.send({
        message: 'This message will never display',
        reason: 'The middleware before this route ends the req-res cycle',
    });
});
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({ users: fakeUsers.results });
});

router.get(
    '/:userId',
    (req, res, next) => {
        console.log('Request URL:', req.originalUrl);
        next();
    },
    (req, res, next) => {
        console.log('Request Type:', req.method);
        next();
    }
);

router.get(
    '/:userId',
    (req, res, next) => {
        const { userId } = req.params;
        // if the userId is 0, skip to the next router
        if (userId === '0') next('route');
        // otherwise pass control to the next middleware in the stack
        else next();
    },
    (req, res, next) => {
        const { userId } = req.params;
        res.send({ userId, message: 'regular' });
    }
);

router.get('/:userId', (req, res, next) => {
    const { userId } = req.params;

    res.send({ userId, message: 'special' });
});

module.exports = router;

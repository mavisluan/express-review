/* eslint-disable no-console */
const express = require('express');

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

router.use('/json', (req, res, next) => {
    res.send({
        path: '/json',
        message: `When the path matches /json, end the req-res cycle`,
        result: '/json routes will not load',
    });
});

/* GET home page. */
// RENDER a ejs page (set the view engine in app.js)
router.get('/', (req, res, next) => {
    res.render('index.ejs', { title: 'HomePage', message: 'This page is created with EJS view engine' });
});

// send string
router.get('/string', (req, res) => {
    res.send('<h1>The path is /string, app.get(path, callback) and res.send this string.</h1>');
});

// send json object
router.get('/json', (req, res) => {
    res.json({
        info: {
            message: 'The path is /json, use app.get(path, callback) and res.send(object)',
            methods: ['app.get()', 'res.send()'],
            send: 'json',
            get: '(path, callback)',
        },
    });
});

// send json with errorMessage property
router.get('/bad', (req, res) => {
    res.json({
        errorMessage: 'Unable to find the result',
    });
});

// get params
router.get('/writers/:writerId/books/:bookId', (req, res) => {
    console.log('params', req.params); // params { writerId: '007', bookId: '1974' }
    res.send(req.params);
});

module.exports = router;

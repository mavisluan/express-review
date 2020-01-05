/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

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

// send error message
router.get('/bad', (req, res) => {
    res.json({
        errorMessage: 'Unable to find the result',
    });
});

module.exports = router;

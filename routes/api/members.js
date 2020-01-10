/* eslint-disable no-console */
const express = require('express');
const members = require('../../public/fake-members.js');
const logger = require('../../middleware/logger');

const router = express.Router();
// Init middleware
router.use(logger);

// GET all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get Single member
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // req.params is a string --> parse id to be a number
    // array.some(() => condition) --> return true of condition meets, else return false
    const found = members.some(m => m.id === parseInt(id));
    if (found) {
        const member = members.filter(m => m.id === parseInt(id));
        res.send(member);
    } else {
        res.status(400).json({ msg: `No member with the id of ${id} found` });
    }
});

module.exports = router;

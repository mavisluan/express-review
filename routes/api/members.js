/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const express = require('express');
const uuid = require('uuid');
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

// Create A Member
// app.use(express.json())  app.use(express.urlencoded())
router.post('/', (req, res) => {
    const { name, email } = req.body;
    const newMember = {
        id: uuid.v4(),
        name,
        email,
    };

    if (!name || !email) {
        return res.status(400).send({ msg: 'Please include both a name and an email' });
    }

    members.push(newMember);
    res.json(members);
});

// Update A Member
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    // array.find() -> if found, return the object -> if not found, return undefined
    const found = members.find(m => m.id === parseInt(id));
    console.log('found', found);
    if (!found) {
        return res.status(400).json({ msg: `No member with the id of ${id} found` });
    }

    members.forEach(m => {
        if (m.id === parseInt(id)) {
            name && (m.name = name);
            email && (m.email = email);
        }
        return m;
    });
    res.json(members);
});

// Delete A member
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const found = members.find(m => m.id === parseInt(id));
    console.log('found', found);
    if (!found) {
        return res.status(400).json({ msg: `No member with the id of ${id} found` });
    }

    return res.json(members.filter(m => m.id !== parseInt(id)));
});
module.exports = router;

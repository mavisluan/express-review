/* eslint-disable no-console */
const express = require('express');
const db = require('../config/db');

const router = express.Router();
// Examples for using node with sql db
// Create DB
router.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('result', result);

        res.send('Database created...');
    });
});

// Create table
router.get('/createpoststable', (req, res) => {
    const sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('result', result);

        res.send('Posts table created...');
    });
});

// Insert post1
router.get('/addpost1', (req, res) => {
    const post = { title: 'Post one', body: 'This is post number one' };
    const sql = `INSERT INTO posts SET ?`; // ? is a placeholder for the insert data
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log('result', result);
        res.send('Post 1 ... created');
    });
});

// Insert post2
router.get('/addpost2', (req, res) => {
    const post = { title: 'Post two', body: 'This is post number two' };
    const sql = `INSERT INTO posts SET ?`; // ? is a placeholder for the insert data
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log('result', result);
        res.send('Post 2 ... created');
    });
});

// Insert post3
router.get('/addpost3', (req, res) => {
    const post = { title: 'Post three', body: 'This is post number three' };
    const sql = `INSERT INTO posts SET ?`; // ? is a placeholder for the insert data
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log('result', result);
        res.send('Post 3 ... created');
    });
});

// Select posts
router.get('/getposts', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('results', results);
        res.send({
            message: 'Posts fetched',
            results,
        });
    });
});

// Select one post
router.get('/getpost/:postId', (req, res) => {
    const { postId } = req.params;
    const sql = `SELECT * FROM posts WHERE id=${postId}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('result', result);
        res.send({
            message: 'Post fetched',
            result,
        });
    });
});

// Update
router.get('/updatepost/:postId', (req, res) => {
    const { postId } = req.params;
    const newTitle = 'Updated title';
    const sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${postId}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('result', result);
        res.send({
            message: 'Post Updated',
            result,
        });
    });
});

// DELETE
router.get('/deletepost/:postId', (req, res) => {
    const { postId } = req.params;
    const sql = `DELETE FROM posts WHERE id = ${postId}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('result', result);
        res.send({
            message: 'Post deleted',
            result,
        });
    });
});

module.exports = router;

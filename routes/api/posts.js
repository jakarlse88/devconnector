const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/Post');

// Load validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: 'Posts works'
    });
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Initialise errors and isValid
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    // Return 400 and errors if input is invalid
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => {
            errors.savepost = err;
            return res.status(500).json(errors);
        });
});


module.exports = router;
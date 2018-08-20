const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/Post');

// Load Profile model
const Profile = require('../../models/Profile');

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

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostsfound: 'No posts found'
        }));
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({
            nopostfound: 'No post found with that ID'
        }));
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

// @route   DELETE api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Hold our errors
    const errors = {};

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check post owner
                    if (post.user.toString() !== req.user.id) {
                        erorrs.notauthorised = 'User not authorised';
                        return res.status(401).json(errors);
                    }

                    // Delete
                    post.remove()
                        .then(() => res.json({
                            success: true
                        }))
                        .catch(err => {
                            errors.postnotfound = 'Post not found';
                            return res.status(404).json(errors);
                        })
                })
                .catch(err => {});
        })
        .catch(err => {
            errors.profilefind = 'Couldn\'t find a profile with specified ID';
            return res.status(500).json(errors);
        })
});


module.exports = router;
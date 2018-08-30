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
    .catch(err =>
      res.status(404).json({
        nopostsfound: 'No posts found'
      })
    );
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({
        nopostfound: 'No post found with that ID'
      })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // Initialise errors and isValid
    const { errors, isValid } = validatePostInput(req.body);

    // Return 400 and errors if input is invalid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        errors.savepost = err;
        return res.status(500).json(errors);
      });
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
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
            post
              .remove()
              .then(() =>
                res.json({
                  success: true
                })
              )
              .catch(err => {
                errors.postnotfound = 'Post not found';
                return res.status(404).json(errors);
              });
          })
          .catch(err => {
            errors.finderror = err;
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.profilefind =
          "Couldn't find a profile with specified ID";
        return res.status(500).json(errors);
      });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // Hold our errors
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Is user's ID already in the array of likes,
            // IE. has the user already liked this post?
            if (
              post.likes.filter(
                like => like.user.toString() === req.user.id
              ).length > 0
            ) {
              errors.alreadyLiked =
                'User already liked this post';
              return res.status(400).json(errors);
            }

            // Add user ID to like array
            post.likes.unshift({
              user: req.user.id
            });

            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                errors.postSave = err;
                return res.status(500).json(errors);
              });
          })
          .catch(err => {
            errors.findError = err;
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.profilefind =
          "Couldn't find a profile with specified ID";
        return res.status(500).json(errors);
      });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // Hold our errors
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Is user's ID already in the array of likes,
            // IE. has the user already liked this post?
            if (
              post.likes.filter(
                like => like.user.toString() === req.user.id
              ).length === 0
            ) {
              errors.notLiked =
                'User has not yet liked this post';
              return res.status(400).json(errors);
            }

            // Remove user ID from array
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);

            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                errors.saveError = err;
                return res.status(500).json(errors);
              });
          })
          .catch(err => {
            errors.findError = err;
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.profilefind =
          "Couldn't find a profile with specified ID";
        return res.status(500).json(errors);
      });
  }
);

// @route   POST api/posts/comments/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comments/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // Initialise errors and isValid
    const { errors, isValid } = validatePostInput(req.body);

    // Return 400 and errors on invalid input
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        const newCommentsArr = [newComment, ...post.comments];

        post.comments = newCommentsArr;

        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            errors.postSave = err;
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.postFind = err;
        return res.status(404).json(errors);
      });
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Verify that comment exists
        if (
          post.comments.filter(
            comment =>
              comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({
            commentNotFound: 'Comment does not exist'
          });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Remove comment from array
        post.comments.splice(removeIndex, 1);

        post
          .save()
          .then(post => res.json(post))
          .catch(err =>
            res.status(500).json({
              postSaveError: 'Could not save post'
            })
          );
      })
      .catch(err => {
        return res.status(404).json({
          postFindError: 'No post was found'
        });
      });
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');

// Load User model
const User = require('../../models/User');

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: 'Profile works'
    });
});

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};

    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => console.log(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    // Hold our errors
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => {
            errors.err = err;
            return res.status(500).json(errors);
        });
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile associated with this handle';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => {
            errors.mongoerror = err;
            res.status(500).json(errors);
        });
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile associated with this ID';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => {
            errors.mongoerror = err;
            res.status(500).json(errors);
        });
});

// @route   POST api/profile
// @desc    Create or edit a user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validate data input
    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    // Invalid input, return 400 and any errors encountered
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills -- split into array
    if (typeof (req.body.skills) !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social -- 
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    })
                    .then(profile => res.json(profile))
                    .catch(err => console.log.err);
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({
                        handle: profileFields.handle
                    })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        // Save profile
                        new Profile(profileFields).save()
                            .then(savedProfile => res.json(savedProfile))
                            .catch(err => console.log(err));
                    })
                    .catch();
            }
        });
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validate data input
    const {
        errors,
        isValid
    } = validateExperienceInput(req.body);

    // Invalid input, return 400 and any errors encountered
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const newExp = [
                ...profile.experience,
                {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }
            ];

            // Add to experience array
            profile.experience = newExp;

            profile.save()
                .then(profile => res.json(profile))
                .catch(err => {
                    errors.profilesave = err;
                    res.status(500).json(errors);
                });
        })
        .catch(err => {
            errors.findprofile = err;
            res.status(500).json(errors);
        });
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validate data input
    const {
        errors,
        isValid
    } = validateEducationInput(req.body);

    // Invalid input, return 400 and any errors encountered
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const newEdu = [
                ...profile.education,
                {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }
            ];

            // Add to experience array
            profile.education = newEdu;

            profile.save()
                .then(profile => res.json(profile))
                .catch(err => {
                    errors.profilesave = err;
                    res.status(500).json(errors);
                });
        })
        .catch(err => {
            errors.findprofile = err;
            res.status(500).json(errors);
        });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Hold our errors
    const errors = {};

    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        // Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save updated profile
        profile.save()
            .then(profile => res.json(profile))
            .catch(err => {
                errors.profilesave = err;
                return res.status(500).json(errors);
            })

    }).catch(err => {
        errors.profilefind = err;
        res.status(500).json(errors);
    });
});

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Hold our errors
    const errors = {};

    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        // Get remove index
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save updated profile
        profile.save()
            .then(profile => res.json(profile))
            .catch(err => {
                errors.profilesave = err;
                return res.status(500).json(errors);
            })

    }).catch(err => {
        errors.profilefind = err;
        res.status(500).json(errors);
    });
});

module.exports = router;
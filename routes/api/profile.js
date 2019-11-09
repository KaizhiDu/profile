const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const config = require('../../config/default');
const request = require('request');

// router GET api/profile/me
// description: get current user's profile
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// router POST api/profile/me
// description: save a profile
router.post('/', authMiddleware,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build projile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills instanceof Array) {
            profileFields.skills = skills;
        } else if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({user: req.user.id});
            // Update
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                );
                return res.json(profile);
            }
            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error');
        }
    });

router.get('/', authMiddleware, async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// router GET api/profile/
// description: Fetch all the profiles
router.get('/', authMiddleware, async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// router GET api/profile/user/:user_id
// description: Fetch profile by user id
router.get('/user/:user_id', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind = 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});

        }
        res.status(500).send("Server Error");
    }
});

// router DELETE api/profile/
// description: delete a user with profile
router.delete('/', authMiddleware, async (req, res) => {
    try {
        await Profile.findOneAndDelete({user: req.user.id});
        await User.findOneAndDelete({_id: req.user.id});
        res.json({msg: 'Delete success !!'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// router PUT api/profile/experience
// description: Create an experience to profile
router.put('/experience', authMiddleware,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From data is required').not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };
        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });

// router DELETE api/profile/
// description: Delete experience
router.delete('/experience/:exp_id', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// router PUT api/profile/education
// description: Create an education to profile
router.put('/experience', authMiddleware,
    [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study data is required').not().isEmpty(),
        check('from', 'From data is required').not().isEmpty()

    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };
        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(newEdu);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });

// router DELETE api/profile/education
// description: Delete education
router.delete('/education/:edu_id', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education.map(item => item._id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// router GET api/profile/github:username
// description: get user repos from github
router.get('/github/:username', authMiddleware, async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_${config.githubClientId}&client_secret=${config.githubSecret}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
            }
            if (response.statusCode !== 200) {
                res.status(404).json({msg: 'No Github profile found'});
            }
            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const config = require('../../config/default');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

// router GET api/auth
router.get('/', authMiddleware, async (req, res) => {
    try {
        // - password is mean do not show password
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// router POST api/auth
// Authenticate user and get token
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'make sure the password exist').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({error: [{msg: 'Invalid Credentials'}]});
            }

            // we need to compare the token and user's password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({error: [{msg: 'Invalid Credentials'}]});
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.JWTSecret,
                {expiresIn: 360000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;
const express = require('express');
const router = express.Router();

// router GET api/posts
router.get('/', (req, res) => res.send('posts router'));

module.exports = router;
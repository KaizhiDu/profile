const express = require('express');
const router = express.Router();

// router GET api/auth
router.get('/', (req, res) => res.send('auth router'));

module.exports = router;
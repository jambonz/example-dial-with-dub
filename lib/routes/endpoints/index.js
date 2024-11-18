const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/dial-dub', require('./dial-dub'));

module.exports = router;

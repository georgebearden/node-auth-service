var  express = require('express');
var router = express.Router();

// Create a new user.
router.post('/', function(req, res) {
	res.send({token:"lksjdf"});
});

module.exports = router;
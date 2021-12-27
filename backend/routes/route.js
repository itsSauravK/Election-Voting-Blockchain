const express = require('express')
const router = express.Router();

const {
    addElection
} = require('../controllers/electionControllers');

router.route('/addElection').get(addElection);

module.exports = router;
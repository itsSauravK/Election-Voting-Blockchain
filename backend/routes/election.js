const express = require('express')
const router = express.Router();

const {
    isAuthenticatedUser,
    authorizeRoles
} = require('../middlewares/auth');

const {
    addElection,
    showCurrentElection, 
    startElection,
    showAllElection,
    oneResult
} = require('../controllers/electionControllers');

//accesed by all routes
router.route('/AllElections').get(showAllElection);  //result of all elections
router.route('/:id').get(oneResult); //result of one election

//user routes
router.route('/showElection').get(isAuthenticatedUser, showCurrentElection);

//admin routes
router.route('/addElection').post(isAuthenticatedUser, authorizeRoles('admin'), addElection);
router.route('/startElection').get(isAuthenticatedUser, authorizeRoles('admin'), startElection);

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');
console.log('User router loaded!');

router.get('/profile/:id', usersController.profile);
router.post('/update/:id', usersController.update);

router.get('/createUser', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
 ) , usersController.createUser);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/editProfile/:id', usersController.editProfile);


router.post('/create', usersController.create);

router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
 ) ,usersController.createSession);

 router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

module.exports = router;
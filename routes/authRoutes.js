const express = require('express');
const bcrypt = require('bcryptjs')
const { registerController, loginController, logoutController } = require('../controller/authController');

//router object
const router = express.Router();

//routes
router.post('/register',registerController);
router.post('/login',loginController)
router.post('/logout',logoutController)



module.exports = router ;
 
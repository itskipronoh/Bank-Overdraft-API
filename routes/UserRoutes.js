const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);


router.get('/profile', protect, userController.getUserProfile);

module.exports = router;

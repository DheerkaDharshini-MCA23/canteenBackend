const express = require('express');
const router = express.Router();
const {register,login,getProfile,updateProfile,authenticateToken} = require('../controllers/UserController')

router.post('/registerUser',register);
router.post('/loginUser',login);


// Protected routes (user profile)
router.get('/profile', authenticateToken, getProfile); // Fetch user profile
router.put('/profile', authenticateToken, updateProfile); // Update user profile

module.exports = router;
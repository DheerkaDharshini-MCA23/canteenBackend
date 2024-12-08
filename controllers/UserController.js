const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req,res)=>{
    const {name,email,password,phone} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(500).json({message:'User already exists!'});
        }

        // if(password !== confirmPassword){
        //     return res.status(500).json({message:'Password do not match!'});
        // }

        if(!name || !email || !password || !phone){
            return res.status(500).json({message:'All Fields are requied!'});
        }


        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({name,email,password:hashedPassword,phone})
        await newUser.save();

        res.status(200).json({message:'Registered Successfully'})
    } catch (error) {
        res.status(404).json({message:'Server error',error})
    }
}


exports.login = async(req,res) =>{

    try {
        const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(500).json({message:'User not found'});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        return res.status(500).json({message:'invalid credentials'})
    }

    const token = jwt.sign({id:user._id},'Dheerka2003',{expiresIn:'1h'});

    res.status(200).json({message:'Registered Successfully!',token,role:user.role, userId: user._id, })
    } catch (error) {
        res.status(404).json({message:'Server error',error})
    }
    
}






// Fetch user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, phone } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Middleware to authenticate and verify token
exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    jwt.verify(token, 'Dheerka2003', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
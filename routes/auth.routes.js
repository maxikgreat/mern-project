const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
// /api/auth
router.post(
    '/register',
    [ //array of middlewares
        check('email', 'Enter valid email ').isEmail(),
        check('password', 'Min 6 characters required').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data while register new user'
            })
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'Email adress already exists '})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'User was created'});


    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult();

        if(!errors.isEmpty) {
            res.status(400).json({
                errors: errors.array(),
                message: 'While login appeared some troubles'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect password. Try again'})
        }

        const token = jwt.sign(
            {userId: user.id}, // token genereted with user id
            config.get('jwtSecret'), // secret phrase
            {expiresIn: '1h'} // will be able 1 hour
        )

        res.json({token, userId: user.id})



    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'});
    }
});

module.exports = router;
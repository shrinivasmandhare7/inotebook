const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

//create a user using :POST "/api/auth/".
//No login required
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength(6),
],
    async (req, res) => {
        //if there are Errors, return Bad Request and Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check whether user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ errors: "Sorry user with that email already exists" })
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.json(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured")
        }

    });

module.exports = router;
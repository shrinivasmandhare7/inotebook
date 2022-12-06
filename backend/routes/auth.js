const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'mostsecuretocken';
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
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authTocken = jwt.sign(data, JWT_SECRET);
            // res.json(user)
            res.json({ authTocken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured")
        }

    });

module.exports = router;
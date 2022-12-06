const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');



//create a user using :POST "/api/auth/".
//Doen't require the Authentication
router.post('/', [
    body('name', 'Enter a Valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength(6),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)).catch(err => res.json({ error: 'Email already exists', message: err.message }));


    });


module.exports = router;
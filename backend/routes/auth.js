const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'mostsecuretoken';


//Route1:create a user using :POST "/api/auth/createuser".
//No login required
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength(6),
],
    async (req, res) => {
        let success = false;
        //if there are Errors, return Bad Request and Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        //check whether user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                success = false;
                return res.status(400).json({ success, errors: "Sorry user with this email already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const payload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            success = true;
            res.json({ success, authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    });

//Route2:Authenticate a user using :POST "/api/auth/login".
//No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password Cannot be blank').exists(),
],
    async (req, res) => {
        let success = false;
        //if there are Errors, return Bad Request and Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success = false;
                return res.status(400).json({ errors: "User does not exist" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ errors: "Wrong Password" });
            }
            const payload = {
                user: {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            success = true;
            res.json({ success, authToken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)
//Route3:Get logged-in user details using :POST "/api/auth/getuser"
//login required
router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            const userID = req.user.id;;
            const user = await User.findById(userID).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


module.exports = router;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mostsecuretocken';

const fetchuser = (req, res, next) => {
    //Get the User from jwt tocken and  add id to req object
    const tocken = req.header('auth-tocken')
    if (!tocken) {
        res.status(401).send({ error: "Please authenticate using a valid token." });
    }
    try {
        const data = jwt.verify(tocken, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token." });
    }

}

module.exports = fetchuser;
const {UNAUTHORIZED, FORBIDDEN} = require('../utils/statusCode');
const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
    let authHeader = req.headers && req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader)
    if(token == null)
        return res.status(UNAUTHORIZED).send();
    try {
        let data = await jwt.verify(token, process.env.AUTH_SECRET||'authSecretTemp@12283897839');
        req.user = data;
        next();
    }
    catch(e) {
        console.log(e)
        return res.status(FORBIDDEN).send();
    }
}

module.exports = authenticate;
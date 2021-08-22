const jwt = require('jsonwebtoken');
const { authValidation } = require("../utils/validation");

exports.login = async function(req, res) {
    const errors = authValidation(req.body);
    if (errors.length) {
        return res.status(400).send(errors[0].message);
    }
    const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
    res.cookie('jwt', accessToken, { secure: true, httpOnly: true })
    res.send({ accessToken: accessToken })
};

//jwt related apis
const jwt = require('jsonwebtoken');

const getJwtToken = async(req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        res.send({ token });
    } catch (error) {
        console.error('error in jwt-controller getJwtToken()');
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getJwtToken };
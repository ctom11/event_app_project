const {verify} = require("jsonwebtoken");


// next is a function that is called when you want the request to move forward
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    if (!accessToken) return res.json({error: "User not logged in"})

    try {
        const validToken = verify(accessToken, "q1p0w2o9e3i8r4u7t5y6");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({err: err});
    }
};

module.exports = {validateToken};
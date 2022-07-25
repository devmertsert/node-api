const jwt = require("jsonwebtoken");

module.exports.verifyJwtToken = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) return res.status(401).json({
        code: 401,
        status: 'error',
        message: 'Unauthorized request',
        error: {}
    });

    try {
        const verified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = verified.id;
        next();
    } catch (error) {
        return res.status(401).json({
            code: 401,
            status: 'error',
            message: 'Invalid token',
            error: {}
        });
    }
}
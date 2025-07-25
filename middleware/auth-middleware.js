const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success : false,
            message : 'Access denied. No token provided. Please login to continue.'
        });
    }

    //decode this token
    try{
        
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decodedTokenInfo);

        req.userInfo = decodedTokenInfo;
        next();

    }catch(error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid or expired token.'
    });
}

    
};

module.exports = authMiddleware;
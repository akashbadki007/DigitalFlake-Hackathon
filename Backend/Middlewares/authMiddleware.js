const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {

    try{
        // const token =  req.body.token || req.cookies.token;
        const token = req.header("Authorization").replace("Bearer ", "");
        
        // Check if token exists
        if(!token) {
            return res.status(401).json({
                success:false,
                msg:"Access denied, no token provided"
            })
        }

        try{
            // Verify the token
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            console.log("Data -->>", decode);
            req.user = decode; 
            next(); // Proceed to the next middleware or route handler

        } catch {
            return res.status(403).json({
                success:false,
                msg:"Invalid token"
            })
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success:false,
            msg:"An error occurred during token verification."
        })
    }
}

exports.isAdmin = (req,res,next) => {

    try{

        if(req.user.role !== "Admin") {
            return res.status(403).json({
                success:false,
                msg:"Access denied. This route is restricted to admin."
            })
        }
        next();

    } catch(err) {
        console.error(err)
        res.status(500).json({
            success:false,
            msg:"Internal server error during role verification."
        })
    }
}


exports.isUser = (req,res,next) => {

    try{

        if(req.user.role !== "User") {
            return res.status(403).json({
                success:false,
                msg:"Access denied. This route is restricted to User."
            })
        }
        next();

    } catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            msg:"Internal server error during role verification."
        })
    }
}


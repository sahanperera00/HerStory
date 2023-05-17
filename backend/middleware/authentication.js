import jwt from 'jsonwebtoken';
import User from '../models/users/userModel.js';


export const authenticate = async (req, res, next) => {
    
    //token we try to fetch from the header
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    
            try{
                token = req.headers.authorization.split(' ')[1];    //We take whats after Bearer once the space is removed.
    
                //decode the token ID
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.object._id).select("-password"); //We omit the password from the user object
                next();
            }catch(error){
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        }
    
        if(!token){
            res.status(401)
            throw new Error("No token found!");
        }
    }catch(error){
        console.log(error);
    }
}
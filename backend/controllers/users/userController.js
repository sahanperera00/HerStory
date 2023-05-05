import User from "../../models/users/userModel.js";
import UserInfo from "../../models/users/userInfoModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../config/generateToken.js";


//Register and Login will create relevant json tokens that will help authenticating the remainder of info 
export const registerUser = async(req,res)=>{    

    try{

        const {name, email, password, role} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "Please enter all the required fields"});
        }
    
        //checks if the user already exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
    
        //Creates new User
        user = new User({
            name,
            role,
            email,
            password
        });
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
    
        //creating a payload for the token
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    
        //Checks if the user is created
        if(user){
            res.status(201).json({user: user, token: generateToken(payload)});
        }else{
            res.status(400).json({message: "Failed to create the token"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Please enter all the required fields"});
        }

        //Backend validation to see if this is a valid email
        if(!email.includes("@")){
            return res.status(400).json({message: "Please enter a valid email"})
        }

        //retrieving the user via mail
        let user = User.find({email});

        //if no email corresponds returns a message asking for valid email
        if(!user){
            return res.status(400).json({message: "Invalid email. Please try again"});
        }

        //if password doesnt match returns a message asking for valid password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password. Please try again!. Cause: " + error.message});
        }

        //creating a payload for the token
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        //Checks if the user is created and returns the user and the token
        if(user){
            return res.status(200).json({user: user, token: generateToken(payload)});
        }else{
            return res.status(400).json({message: "Failed to create the token please try again"});
        }
    }catch(error){
        res.status(500).json({message: "Internal Server Error - Reached the catch statement. Cause: " + error.message});
    }
}


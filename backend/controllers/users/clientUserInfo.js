import User from "../../models/users/userModel.js";
import UserInfo from "../../models/users/userInfoModel.js";
import bcrypt from "bcryptjs";

export const getUserBiobyEmail = async(req,res)=>{

        //authenticate req.user is passed.

        const {dob,designation,country} = req.body;
        
        try{

            //validating if a userInfo has already been created by this version before
            const isUserInfo = await UserInfo.findOne({"user": req.user._id});

            if(isUserInfo){
                res.status(400).json("User Info already created");
            }else{
                const userInfo = await UserInfo.create({
                    user: req.user._id,
                    dob: dob,
                    designation: designation,
                    country: country,
                });
                userInfo.save();
    
                //Now when we call populate, instead of just showing the UserId inside the User attribute of UserModel,
                //It will show all the information relevant to the UserId that's passed inside the User attribute of UserModel
    
                const completeUser = await UserInfo.findOne({"_id": final._id}).populate({path:"user",select:"name email role"});
                res.send({full:completeUser, usual: userInfo});
                //For postman comparison, Both populated and normal method has been returned. Check the difference for yourself.
            }

        }catch(error){
            res.status(500).json({message: error.message});
        }
}
import User from "../../models/users/userModel.js";
import UserInfo from "../../models/users/userInfoModel.js";
import bcrypt from "bcryptjs";

export const getUserBiobyEmail = async(req,res)=>{


        const {dob,designation,country, email} = req.body;

        try{

            //first we get the USER from the email
            const user = await User.findOne({"email": email});
            console.log(user._id.toString());
            
            //then we pass the userId to the userInfo referene attribute since thats what we have defined in the model
            const final = await UserInfo.create({
                user: user._id,
                dob: dob,
                designation: designation,
                country: country,
            });

            //We save the model
            final.save();

            //Now when we call populate, instead of just showing the UserId inside the User attribute of UserModel,
            //It will show all the information relevant to the UserId that's passed inside the User attribute of UserModel

            const fullUser = await UserInfo.findOne({"_id": final._id}).populate({path:"user",select:"name email role password"});
            res.send({full:fullUser, usual: final});
            //For postman comparison, Both populated and normal method has been returned. Check the difference for yourself.

        }catch(error){
            res.status(500).json({message: error.message});
        }
}
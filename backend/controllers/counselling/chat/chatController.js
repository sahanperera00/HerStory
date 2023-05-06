import User from "../../../models/users/userModel.js";
import Chat from "../../../models/counselling/chat/chatModel.js";

export const accessChat = async(req,res)=>{
    try{
        
        const {receiverId} = req.body;

        //validating if a chat has been made before

        let isChat = await Chat.find({
            $and : [
                { users : { $elemMatch : { $eq: req.user._id}}},
                { users: {$elemMatch : { $eq: receiverId}}},    
            ]
        }).populate("users","-password").populate("latestMessage"); //While looking for a chat, we are populating the users and latestMessage fields as well

        console.log("Before Message Populate: ",isChat)
        //Since originally no message has been actually created we forge a late message without having it in the database via populate
        //For that we use the User to be populated in the Message model
        isChat = await User.populate(isChat, {path: "latestMessage.sender",select: "-password"});

        console.log("After Message Populate: ",isChat)

        if(isChat.length > 0){
            res.send(isChat[0]);    //If there's a result already, send it else we create the chat
        }else{
            var charData = {
                chatName: "sender",
                users: [req.user._id,receiverId],   
                //Since no message is actually created no passing. Just creating the latestMessage.sender
            }   

            const newChat = await Chat.create(charData);
            const fullChat = await Chat.findById(newChat._id).populate({path: "users",select: "-password"});

            res.status(201).send({raw: newChat, full: fullChat});
        }
    }catch(error){
        res.sendStatus(500).json({message: error.message});
    }
}


import User from "../../../models/users/userModel.js";
import Chat from "../../../models/counselling/chat/chatModel.js";
import Message from "../../../models/counselling/chat/messageModel.js";

//Sending a message
export const sendMessage = async(req,res)=>{
    const {content, chatId} = req.body;

    if(!content && !chatId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try{
        var message = await Message.create(newMessage);
        message = await message.populate("sender","-password");
        message = await message.populate("chat");
        message = await User.populate(message, {path: "chat.users", select: "-password"});
        message = await Message.populate(message,{path: "chat.latestMessage", select: "content"});

        await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});
        res.json(message);
    }catch(error){
        res.status(400);
        throw new Error("Error at catch: ", error.message);
    }
}

//fetching all the messages according to the chatId
export const allMessages = async(req,res)=>{
    try{
        const messages = await Message.find({chat: req.params.chatId}).populate('sender','firstName lastName pic email');
        res.json(messages);
    }catch(err){
        res.sendStatus(400);
        throw new Error("Error at catch: ", err.message);
    }
}

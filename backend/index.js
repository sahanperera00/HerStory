import express from "express"

import dotenv from "dotenv/config"
import cors from "cors"
import bodyParser from "body-parser"

import { connectDB } from "./config/db.js"

//Route import

//Devindu
import userRoutes from "./routers/users/user.routes.js"
import chatRoutes from "./routers/counselling/chat.routes.js"
import messageRoutes from "./routers/counselling/messages.routes.js"



//Chanukya
import PostRoutes from "./routers/Forum/post.routes.js"



//Sahan
import FeedbackRoutes from "./routers/counselling/feedback.routes.js"
import CategoryRoutes from "./routers/counselling/category.routes.js"
import ComplaintRoutes from "./routers/complaint/complaint.routes.js"
import CounsellorRoutes from "./routers/users/counseller.routes.js"

//Nashali
import CommunityRoutes from "./routers/Forum/community.routes.js";
import CommentRoutes from "./routers/Forum/comments.routes.js";



//bodyParser and CORS configuration - express 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//PORT Configurations 
const PORT = process.env.PORT || 8070;

//Route Implementaion
//Devindu
app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use('/message',messageRoutes);




//Chanukya
app.use('/posts',PostRoutes);



//Sahan
app.use('/feedback',FeedbackRoutes);
app.use('/category',CategoryRoutes);
app.use('/complaint',ComplaintRoutes);
app.use('/counsellor',CounsellorRoutes);
//Nashali'
app.use("/community", CommunityRoutes);
app.use('/comment',CommentRoutes);



//Setting up mongoDB
connectDB();

//Starting the server
app.listen(PORT,console.log(`Server is running on port: ${PORT}`));





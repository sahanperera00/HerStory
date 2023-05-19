import React,{useState} from "react"

import {Box} from "@chakra-ui/layout"
import { useChatState } from "../../contexts/ChatProvider";

//importing components
import SideDrawer from "../../components/ChatComponents/SideDrawer";
import Chatbox from "../../components/ChatComponents/ChatBox";
import MyChats from '../../components/ChatComponents/MyChats';

const ChatPage = () =>{
  
   const { user } = useChatState();
   

  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer/>}
      <Box
      display='flex'
      justifyContent='space-between'
      w='100%'
      h='91.5vh'
      p='10px'>
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>
    </div>
  )
}

export default ChatPage;
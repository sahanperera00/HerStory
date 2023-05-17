import React,{createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext();


const ChatProvider = ({children}) => {

  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState();
  const [notification,setNotification] = useState(false);
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState(null); 

  const navigate = useNavigate();

  useEffect(()=>{

    const userToken = localStorage.getItem("token");
    setToken(userToken);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

  },[navigate]);

  return (
    <ChatContext.Provider value={{
      selectedChat,
      setSelectedChat,
      user,
      setUser,
      notification,
      setNotification,
      chats,
      setChats,
      token,
      setToken
    }} >
        {children}
    </ChatContext.Provider>
  )
}

export const useChatState = () => useContext(ChatContext);
export default ChatProvider;
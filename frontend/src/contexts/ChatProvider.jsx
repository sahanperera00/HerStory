import React,{createContext, useContext, useEffect, useState} from 'react'

const ChatContext = createContext();


const ChatProvider = ({children}) => {

  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification,setNotification] = useState(false);
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState(null); 
  const [loggedUser, setLoggedUser] = useState();



  useEffect(()=>{

    const userToken = localStorage.getItem("token");
    setToken(userToken);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

  },[]);

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
      setToken,
      loggedUser,
      setLoggedUser
    }} >
        {children}
    </ChatContext.Provider>
  )
}

export const useChatState = () => useContext(ChatContext);
export default ChatProvider;
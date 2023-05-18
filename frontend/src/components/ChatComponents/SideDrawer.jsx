import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useChatState } from "../../contexts/ChatProvider";

//UI imports
import { Box, Button, Text, Tooltip , Menu, MenuButton, MenuList, MenuItem,MenuDivider, useToast, Input, Spinner} from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/avatar";

import { useDisclosure } from "@chakra-ui/react";
 
import {ChevronDownIcon, BellIcon} from "@chakra-ui/icons"
import { BiSearchAlt } from "react-icons/bi";


import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    
  } from "@chakra-ui/modal";

//Relevant Components
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import ProfileModal from "./ProfileModal";




const SideDrawer = () => {

    const Toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();  //Chakra
    const navigate = useNavigate();

    //useStates
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    //Custom States
    const {user,setSelectedChat, chats,setChats, selectedChat } = useChatState();

    //Logout Handler
    const logOutHandler = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate('/');
        alert("You have been logged out");

    }

    //Searchbar Handler
    const handleSearch = async()=>{
        if(!search){
            Toast({
                title: "Please enter a valid name",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            })
        }

        try{
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const {data} = await axios.get(`http://localhost:8070/user/users?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
            console.log("SearchResults",searchResult);
        }catch(error){
            Toast({
                title: "Error fetching data",
                status: "error",
                description: error.message,
                duration: 3000,
                isClosable: true,
                position: "top-left",
            })
        }
    }

    const accessChat = async(userId)=>{
        try{
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };


            //console.log("UserID: ", userId);
            const {data} = await axios.post(`http://localhost:8070/chat`,{receiverId: userId},config);

            if(!chats.find((chat)=> chat._id===data._id)) setChats([data,...chats]) //If we already have the chat we are creating, dont duplicate it. Just show the same we have created before.
            setSelectedChat(data);
            console.log(selectedChat);
            setLoadingChat(false);
            onClose();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen} >
                    <BiSearchAlt />
                    <Text d={{ base: "none", md: "flex" }} px={4}>
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <img
                src="https://firebasestorage.googleapis.com/v0/b/herstory-6a3c0.appspot.com/o/logo-no-background.png?alt=media&token=08cba1bc-5127-4a4a-8ea6-75cf010b01b1"
                alt="herstory logo"
                className="w-[200px] my-10" style={{ width: "200px",
               marginTop: "10px", marginBottom: "10px" , flex: "true"}}
            />
            <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                // count={notification.length}
                // effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user.user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem  onClick={logOutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>

        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />

            ) : (
              searchResult?.map((user) => 
              (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
               
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </>
    );
};

export default SideDrawer;

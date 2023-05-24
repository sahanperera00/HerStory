import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings, Button } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ClientSidebar from "../../components/ClientComponents/ClientSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChatState } from "../../contexts/ChatProvider";
import { Header } from "antd/es/layout/layout";

import { useToast } from "@chakra-ui/react";

export default function Counsel() {

  const Toast = useToast();
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const navigate = useNavigate();

  const [counsellors, setCounsellors] = useState([]);
  const {selectedChat, setSelectedChat, user} = useChatState();

  useEffect(()=>{
    console.log(user);
  },[])


  const handleChat = async(receiverId)=>{
    try{  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post(`http://localhost:8070/chat`,{receiverId: receiverId},config);
      setSelectedChat(data);
      Toast({
        title: "Say Hello to your new Counsellor!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });

      navigate("/chats");
    }catch(error){
      console.log(error.message);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8070/counsellor/approved")
      .then((res) => {
        setCounsellors(res.data.counsellorInfo);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            {" "}
            {/* THEME SETTINGS BUTTON */}
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {activeMenu ? ( // SIDEBAR IMPLEMENTATION
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg  bg-[#f9e9e9]">
              <ClientSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <ClientSidebar />
            </div>
          )}

          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                {/* Show counsellor in the array as cards */}
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                        Meet your Counsellors
                      </h2>
                      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                        Raise your voice. You're not alone in this fight!
                      </p>  

                <div className="flex flex-wrap gap-5 justify-center">
                  {counsellors &&
                    counsellors.length > 0 &&
                    counsellors.map((counsellor) => (
                      <div className="relative w-[350px] px-5 justify-center items-center bg-white dark:bg-secondary-dark-bg rounded-lg shadow-md hover:bg-[#fcfcfc] hover:shadow-lg">
                        <div className="flex flex-col justify-center items-center px-8 py-8 rounded-lg">
                          <h1 className="text-2xl font-bold mt-2 dark:text-white">
                            <img
                              src={counsellor.user.pic}
                              className="w-20 h-20 rounded-full mx-auto"
                              alt=""
                            />
                            <br />
                            {counsellor.user.firstName}{" "}
                            {counsellor.user.lastName}
                          </h1>
                          <h3 className="font-bold mt-2 dark:text-white">
                            {counsellor.user.email}
                          </h3>
                          <button
                            onClick={()=>handleChat(counsellor.user._id)}
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                          >
                            Let's Talk !
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

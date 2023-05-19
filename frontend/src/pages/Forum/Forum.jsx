//import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ClientSidebar from "../../components/ClientComponents/ClientSidebar";
import Post from "../../components/homeSection/Post";
// import RightSideBar from "../../components/homeSection/RightSideBar";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/ForumNavbar";
import axios from "axios";
//import AlertComp from "../../components/Alert";

function Forum() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("userInfo")).user;

  useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getPosts = async () => {
      await axios
        .get("http://localhost:8070/posts", header)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, []);

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
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
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <ClientSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <ClientSidebar />
            </div>
          )}

          <div
            className={
              // MAIN BACKGROUND IMPLEMENTATION
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            {/* <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div> */}

            <div>
              {themeSettings && <ThemeSettings />}
              <div></div>

              <div className="bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
                <Navbar />
                <div className="container flex mx-auto">
                  {/* {success && <AlertComp setSuccess={setSuccess} />} */}
                  {/* <div className="w-full max-xl:w-[100vw] flex flex-row justify-around mr-[30%]"> */}
                  <div className="w-[100%]">
                    <div className=" h-[100px] w-[93.35%] mx-4 mt-4 p-4 shadow-[0px_4px_10px_rgba(0,0,0,0.25)] rounded-[15px] bg-[#f9e9e9]">
                      <div className="inline-block w-[68px] bg-pink-300 h-[68px] rounded-xl overflow-hidden">
                        <img
                          src={user?.pic}
                          className="h-full w-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="inline-block w-[calc(90%-100px)] h-[68px] p-6 relative -top-7">
                        <input
                          className="w-[110%] h-[100%]  rounded-lg p-4 border-2 border-gray-300 focus:border-2 focus:border-gray-400 focus:outline-none"
                          type="text"
                          placeholder="Post something"
                          onClick={() => {
                            setModalOpen(true);
                          }}
                        ></input>
                      </div>
                      <div className="inline-block w-[calc(10%+32px)] h-[100%] relative"></div>
                    </div>
                    <Post posts={posts} />
                  </div>
                  {/* <RightSideBar /> */}
                  {/* </div> */}
                </div>
                {modalOpen && (
                  <Modal
                    setOpenModal={setModalOpen}
                    setSuccess={setSuccess}
                    mask="false"
                  />
                )}
              </div>
              <h1 className="ml-5"></h1>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forum;

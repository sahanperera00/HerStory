import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ClientSidebar from "../../components/ClientComponents/ClientSidebar";
import ClientProfile from "../../components/ClientComponents/ClientProfile";

import { useChatState } from "../../contexts/ChatProvider";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function ClientDashboard() {
  // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

 const {loggedUser, setLoggedUser} = useChatState();
  /* 
  ------------------------------------------------
  YOUR AXIOS CALLS AND USE STATES GOES  ABOVE HERE 
  ------------------------------------------------
  */
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log(loggedUser);
  },[])

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
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                {/* Paste your content Here */}

                <div className="">
                  <ClientProfile/>
                </div>

                <h1 className="ml-5"></h1>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

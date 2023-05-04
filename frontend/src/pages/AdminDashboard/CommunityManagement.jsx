import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import Forum from "../Forum/Forum";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function CommunityManagement() {
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

  /* 
  ------------------------------------------------
  YOUR AXIOS CALLS AND USE STATES GOES  ABOVE HERE 
  ------------------------------------------------
  */

  const community = [
    {
      id: "Com1",
      title: "Survivor Support Community",
      desc: " A space for survivors of harassment or assault to connect with one another, share their stories, and offer support to each other",
      members: "8 members",
    },
    {
      id: "Com3",
      title: "Legal Advice and Resources Community",
      desc: "Providing legal resources and advice",
      members: "10 members",
    },
    {
      id: "Com3",
      title: "Mental Health and Wellness Community",
      desc: "Focus on providing resources and support for women who are struggling with the mental health effects",
      members: "50 members",
    },
    {
      id: "Com4",
      title: "Workplace Harassment Community",
      desc: "Providing resources and support for women who have experienced harassment or assault in the workplace",
      members: "20 members",
    },
    {
      id: "Com5",
      title: "Education and Prevention Community",
      desc: "Educating and raising awareness about harassment and assault, as well as providing resources and strategies for preventing it",
      members: "30 members",
    },
  ];

  return (
    <div>
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
              <AdminSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <AdminSidebar />
            </div>
          )}

          <div
            className={
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
              <div className="md:m-6 p-5">
                <Header title="Manage Communities" />

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Community ID" />
                        <TableHeader value="Community title" />

                        <TableHeader value="Number of members" />
                        <TableHeader value="Action" />
                      </tr>
                    </thead>
                    <tbody>
                      {community &&
                        community.map((data) => {
                          return (
                            <tr
                              key={data.id}
                              className="bg-white  hover:bg-[#fcfcfc] border-b-2 border-gray-200 dark:bg-slate-800"
                            >
                              <TableData value={data.id} />
                              <TableData value={data.title} />
                              {/* <TableData value={data.desc} /> */}
                              <TableData value={data.members} />

                              <TableData>
                                <Link to="/admin/order-details">
                                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                    View
                                  </button>
                                </Link>
                              </TableData>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

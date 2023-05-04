import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function CommunityManagement() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const community = [
    {
      id: "Community 1",
      title: "Survivor Support Community",
      desc: " A space for survivors of harassment or assault to connect with one another, share their stories, and offer support to each other",
      date: "2023-04-04",
      members: "8 members",
    },
    {
      id: "Community 2",
      title: "Legal Advice and Resources Community",
      desc: "Providing legal resources and advice",
      date: "2023-05-02",
      members: "10 members",
    },
    {
      id: "Community 3",
      title: "Mental Health and Wellness Community",
      desc: "Focus on providing resources and support for women who are struggling with the mental health effects",
      date: "2023-05-04",
      members: "50 members",
    },
    {
      id: "Community 4",
      title: "Workplace Harassment Community",
      desc: "Providing resources and support for women who have experienced harassment or assault in the workplace",
      date: "2023-05-06",
      members: "20 members",
    },
    {
      id: "Community 5",
      title: "Education and Prevention Community",
      desc: "Educating and raising awareness about harassment and assault, as well as providing resources and strategies for preventing it",
      date: "2023-05-09",
      members: "30 members",
    },
  ];

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
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

          {/* SIDEBAR IMPLEMENTATION */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-[#f9e9e9]">
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
                ? "dark:bg-main-dark-bg min-h-screen md:ml-72 w-full  "
                : " dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div className="md:m-6 p-5">
                <Header title="Forum Communities Management" />

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Community ID" />
                        <TableHeader value="Community Title" />
                        <TableHeader value="Date Created" />
                        <TableHeader value="Number of Members" />
                        <TableHeader value="Actions" />
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
                              <TableData value={data.date} />
                              <TableData value={data.members} />
                              <TableData
                                value={
                                  <div className="flex gap-4">
                                    <button
                                      className="text-white bg-[rgb(121,205,222)] p-2 rounded-full hover:bg-[rgb(121,205,222)]"
                                      title="Edit"
                                    >
                                      <AiOutlineEdit />
                                    </button>
                                    <button
                                      className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                                      title="Remove"
                                    >
                                      <RiDeleteBin2Line />
                                    </button>
                                  </div>
                                }
                              />
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

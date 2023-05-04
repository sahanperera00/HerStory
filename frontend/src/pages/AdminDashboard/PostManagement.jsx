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
import { MdPreview } from "react-icons/md";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

export default function ForumManagement() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const posts = [
    {
      id: 1,
      title: "Violence against women isn't cultural, it's criminal.",
      email: "Chanukya@gmail.com",
      date: "2023-04-05",
    },
    {
      id: 2,
      title:
        "Women's mental health is an important element in one's overall well-being and contentedness",
      email: "Nashali@gmail.com",
      date: "2023-05-05",
    },
    {
      id: 3,
      title: "Why We Need To Pay Attention to Women's Mental Health",
      email: "XimBot@123gmail.com",
      date: "2023-05-08",
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
                <Header title="Forum Posts Management" />

                <div className=" flex items-center mb-5 ">
                  {" "}
                  <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                    <DateRangePickerComponent
                      //ref={dateRangeRef}
                      placeholder="Select a date range"
                    />
                  </div>
                  <div className="ml-5">
                    <button
                      type="button"
                      className="py-2 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
                      onClick={() => filterDate()}
                    >
                      Filter
                    </button>
                  </div>
                </div>

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Post ID" />
                        <TableHeader value="Title" />
                        <TableHeader value="User Email" />
                        <TableHeader value="Date" />
                        <TableHeader value="Action" />
                      </tr>
                    </thead>
                    <tbody>
                      {posts &&
                        posts.map((data) => {
                          return (
                            <tr
                              key={data.id}
                              className="bg-white  hover:bg-[#fcfcfc] border-b-2 border-gray-200 dark:bg-slate-800"
                            >
                              <TableData value={data.id} />
                              <TableData value={data.title} />
                              <TableData value={data.email} />
                              <TableData value={data.date} />
                              <TableData
                                value={
                                  <div className="flex gap-4">
                                    <button
                                      className="text-white bg-[#f4c723] p-2 rounded-full hover:bg-[#f4c723]"
                                      title="View"
                                    >
                                      <MdPreview />
                                    </button>
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings, Button } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, TableHeader, TableData } from "../../components";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {BiDetail} from "react-icons/bi";
import CounsellorSidebar from "./CounsellorSidebar";

export default function PendingRequests() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const orders = [
    {
      id: 1,
      name: "Sahan Perera",
      email: "sahan@gmail.com",
      phoneNumber: "0778635445",
      dob: "2000-01-31",
      category: "Legal Consultation",
    },
    {
      id: 2,
      name: "Devindu Samarasinghe",
      email: "devindu@gmail.com",
      phoneNumber: "0715646235",
      dob: "1999-05-12",
      category: "Couseling & Therapy",
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
              <CounsellorSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <CounsellorSidebar />
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
                <Header title="Pending Requests" />

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Name" />
                        <TableHeader value="Email" />
                        <TableHeader value="Date of Birth" />
                        <TableHeader value="Category" />
                        <TableHeader value="Phone Number" />
                        <TableHeader value="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.map((data) => {
                          return (
                            <tr
                              key={data.id}
                              className="bg-white hover:bg-[#fcfcfc] border-b-2 border-gray-200 dark:bg-slate-800"
                            >
                              <TableData value={data.name} />
                              <TableData value={data.email} />
                              <TableData value={data.dob} />
                              <TableData value={data.category} />
                              <TableData value={data.phoneNumber} />
                              <TableData
                                value={
                                  <div className="flex gap-4">
                                  <button className="text-white bg-[#cbcb6d] p-2 rounded-full hover:bg-[#cbcb6d]" title="View">
                                    <BiDetail />
                                  </button>
                                    <button className="text-white bg-[#79de79] p-2 rounded-full hover:bg-[#79de79]" title="Accept">
                                      <AiOutlineCheck />
                                    </button>
                                    <button className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]" title="Reject">
                                      <AiOutlineClose />
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

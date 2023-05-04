import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import CounsellorSidebar from "./CounsellorSidebar";
import { Header, TableHeader, TableData } from "../../components";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function CounsellorDashboard() {
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

  const orders = [
    {
      id: 1,
      client: "John Doe",
      grossPrice: "1000",
      commission: "100",
      status: "Confirmed",
    },
    {
      id: 2,
      client: "John Doe",
      grossPrice: "1000",
      commission: "100",
      status: "Confirmed",
    },
    {
      id: 3,
      client: "John Doe",
      grossPrice: "1000",
      commission: "100",
      status: "Confirmed",
    },
  ];

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
                : "dark:bg-main-dark-bg w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div className="md:m-6 p-5">
                <Header title="Topic" />

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Order ID" />
                        <TableHeader value="Client" />
                        <TableHeader value="Gross Price" />
                        <TableHeader value="Commission" />
                        <TableHeader value="Status" />
                        <TableHeader value="Action" />
                      </tr>
                    </thead>
                    <tbody>
                      {orders && orders.map((data) => {
                        return (
                          <tr
                            key={data.id}
                            className="bg-white  hover:bg-[#fafafa] border-b-2 border-gray-200 dark:bg-slate-800"
                          >
                            <TableData value={data.id} />
                            <TableData value={data.client} />
                            <TableData value={data.grossPrice} />
                            <TableData value={data.commission} />
                            <TableData value={data.status} />
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

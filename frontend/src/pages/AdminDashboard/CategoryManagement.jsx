import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function CategoryManagement() {
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

  const categories = [
    {
      id: 1,
      name: "Category 1",
      description: "Category 1 Description",
      status: "Active",
    },
    {
      id: 2,
      name: "Category 2",
      description: "Category 2 Description",
      status: "Active",
    },
    {
      id: 3,
      name: "Category 3",
      description: "Category 3 Description",
      status: "Active",
    },
    {
      id: 4,
      name: "Category 4",
      description: "Category 4 Description",
      status: "Active",
    },
  ];

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
                <Header title="Category Management" />

                <div className="block w-full overflow-x-auto rounded-lg">
                  {/* category cards */}
                  <div className="flex flex-wrap flex-row w-[100%] p-3">
                      {/* card */}
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="w-[400px] m-3 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                          <div className="px-3 py-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                                {category.name}
                              </span>
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                                {category.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                                {category.description}
                              </span>
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                                Edit
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import { RxDotsVertical, RxEyeOpen, RxEyeNone, RxPlus } from "react-icons/rx";

export default function CategoryManagement() {
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
      name: "Legal Consultation",
      description:
        "This category may include consultation services related to legal issues such as domestic violence, sexual harassment, and stalking",
      status: "Active",
    },
    {
      id: 2,
      name: "Coucelling & Therapy",
      description:
        "This category may include consultation services related to mental health issues caused by harassment, including depression, anxiety, and post-traumatic stress disorder",
      status: "Active",
    },
    {
      id: 3,
      name: "Self Defense & Safty Training",
      description:
        "This category may include consultation services related to self-defense and safety training to prevent harassment and other forms of violence",
      status: "Deactive",
    },
    {
      id: 4,
      name: "Workplace Harassment Consultation",
      description:
        "This category may include consultation services related to workplace harassment, including sexual harassment, discrimination, and bullying",
      status: "Active",
    },
    {
      id: 5,
      name: "Safty Planing & Support",
      description:
        "This category may include consultation services related to safety planning and support for victims of harassment, including emergency planning, advocacy, and crisis intervention",
      status: "Active",
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
                : "dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div className="">
              {themeSettings && <ThemeSettings />}
              <div className="md:m-6 p-5">
                <Header title="Category Management" />

                <div className="block w-full overflow-x-auto rounded-lg grid grid-cols-3 gap-4 p-5">
                  <div className="w-full border-2 border-white flex items-center bg-[#ffffff55] justify-center border-dashed dark:bg-secondary-dark-bg rounded-lg hover:border-4 cursor-pointer"  title="Add a new category">
                    <RxPlus className="w-full text-6xl text-white"/>
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="w-full px-5 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-md hover:bg-[#fcfcfc] hover:shadow-lg"
                    >
                      <div className="px-3 py-5">
                        <div className="items-center text-center flex flex-col gap-4">
                          <p className="text-md font-bold text-gray-600 dark:text-gray-400">
                            {category.name}
                          </p>
                          <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                          {category.status === "Active" ? (
                            <span className="text-xl font-bold text-[lightgreen] dark:text-gray-400">
                            {category.status}
                          </span>
                          ) : (
                            <span className="text-xl font-bold text-[#fb6962] dark:text-gray-400">
                              {category.status}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-center items-center mt-3">
                          <div className="flex gap-4">
                            <button
                              className="text-white bg-[#cbcb6d] p-2 rounded-full hover:bg-[#cbcb6d]"
                              title="Edit"
                            >
                              <RxDotsVertical />
                            </button>
                            <button
                              className="text-white bg-[#79de79] p-2 rounded-full hover:bg-[#79de79]"
                              title="Activate"
                            >
                              <RxEyeOpen />
                            </button>
                            <button
                              className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                              title="Deactivate"
                            >
                              <RxEyeNone />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* </div> */}
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

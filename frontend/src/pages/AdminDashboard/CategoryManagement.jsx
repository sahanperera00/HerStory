import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header } from "../../components";
import { RxDotsVertical, RxEyeOpen, RxEyeNone, RxPlus } from "react-icons/rx";
import axios from "axios";
import AddCategory from "../../components/Modal/AddCategory";
import { MdOutlineCancel } from "react-icons/md";
import UpdateCategory from "../../components/Modal/UpdateCategory";

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

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [state, setState] = useState(false);

  const handleDeleteCategory = (id) => {
    axios
      .delete(`http://localhost:8070/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setState(!state);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

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
                  <AddCategory
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    state={state}
                    setState={setState}
                  />
                  <div
                    className="w-full py-10 border-2 border-white flex items-center bg-[#ffffff55] justify-center border-dashed dark:bg-secondary-dark-bg rounded-lg hover:border-4 cursor-pointer"
                    title="Add a new category"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <RxPlus className="w-full text-6xl text-white" />
                  </div>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category, index) => (
                      <div
                        key={category._id}
                        className="relative w-full px-5 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-md hover:bg-[#fcfcfc] hover:shadow-lg"
                      >
                        <MdOutlineCancel
                          className="absolute right-1 top-1 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200 ease-in-out"
                          onClick={() => {
                            handleDeleteCategory(category._id);
                          }}
                          title="Delete this category"
                        />
                        <div className="px-3 py-5">
                          <div className="items-center text-center flex flex-col gap-4">
                            <p className="text-md font-bold text-gray-600 dark:text-gray-400">
                              {category.name}
                            </p>
                            <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                              {category.description}
                            </p>
                            {category.visibility ? (
                              <span className="text-xl font-bold text-[lightgreen] dark:text-gray-400">
                                Active
                              </span>
                            ) : (
                              <span className="text-xl font-bold text-[#fb6962] dark:text-gray-400">
                                Deactive
                              </span>
                            )}
                          </div>
                          <div className="flex justify-center items-center mt-3">
                            <div className="flex gap-4">
                              <UpdateCategory
                                updateModalOpen={updateModalOpen}
                                setUpdateModalOpen={setUpdateModalOpen}
                                category={category}
                                state={state}
                                setState={setState}
                              />
                              <button
                                className="text-white bg-[#cbcb6d] p-2 rounded-full hover:bg-[#cbcb6d]"
                                title="Edit this category"
                                onClick={() => setUpdateModalOpen(true)}
                              >
                                <RxDotsVertical />
                              </button>
                              {category.visibility === true ? (
                                <button
                                  className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                                  title="Deactivate this category"
                                  onClick={() => {
                                    axios
                                      .post(
                                        `http://localhost:8070/category/${category._id}`,
                                        {
                                          visibility: "false",
                                        },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${localStorage.getItem(
                                              "token"
                                            )}`,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        setState(!state);
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                >
                                  <RxEyeNone />
                                </button>
                              ) : (
                                <button
                                  className="text-white bg-[#79de79] p-2 rounded-full hover:bg-[#79de79]"
                                  title="Activate this category"
                                  onClick={() => {
                                    axios
                                      .post(
                                        `http://localhost:8070/category/${category._id}`,
                                        {
                                          visibility: true,
                                        },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${localStorage.getItem(
                                              "token"
                                            )}`,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        setState(!state);
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                >
                                  <RxEyeOpen />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Header, Navbar, Footer, ThemeSettings } from "../../components/index";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function CommunityEdit(
  postImage,
  uploadPostImage,
  filepickerRef
) {
  // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const navigate = useNavigate();
  const [comID, setComID] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [Members, setMembers] = useState("");
  const [picture, setpicture] = useState("");

  //var date = new Date().toISOString().split("T")[0];
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const { id } = useParams(); //get the id from the url

  const getcommunity = () => {
    axios
      .get(`http://localhost:8070/community/${id}`) //get the data from the backend
      .then((res) => {
        setComID(res.data.comID);
        setname(res.data.name);
        setdescription(res.data.description);
        setMembers(res.data.Members);
        setpicture(res.data.picture);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getcommunity(); // <== CHANGE ACCORDING TO YOUR OWN FUNCTIONS, YOU CAN REMOVE THIS LINE IF YOU DON'T NEED IT
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  /* 
  ------------------------------------------------
  YOUR AXIOS CALLS AND USE STATES GOES  ABOVE HERE 
  ------------------------------------------------
  */

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

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
              <div>
                <div className="m-2 md:m-10  mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                  {/* <Header  title=" Add New Community" /> */}

                  <h2 className="mb-5 text-3xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
                    Edit Community details
                  </h2>
                  <div className=" flex items-center justify-center ">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newCommunity = {
                          comID,
                          name,
                          description,
                          Members,
                          picture,
                        };

                        await axios
                          .put(
                            "http://localhost:8070/community/" + id,
                            newCommunity
                          )
                          .then(() => {
                            Swal.fire({
                              icon: "success",
                              title: "Data Successfully Updated",
                              color: "#f8f9fa",
                              background: "#6c757d",
                              showConfirmButton: false,
                              timer: 2000,
                            });
                            navigate("/admin/manage-community");
                          })
                          .catch((err) => {
                            console.log(err);
                            alert("Error occured");
                          });
                      }}
                    >
                      <div className="mb-3">
                        <label htmlFor="employeeNIC" className="form-label">
                          Community ID:{" "}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 h-50 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          required
                          defaultValue={comID}
                          disabled
                          onChange={(e) => {
                            setComID(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="employeeFullName"
                          className="form-label"
                        >
                          Title :{" "}
                        </label>
                        <textarea
                          type="text"
                          rows={2}
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeFullName"
                          defaultValue={name}
                          required
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="employeeDOB" className="form-label">
                          Description :{" "}
                        </label>
                        <textarea
                          type="text"
                          rows={3}
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeDOB"
                          defaultValue={description}
                          required
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="employeeNIC" className="form-label">
                          Community ID:{" "}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 h-50 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          defaultValue={Members}
                          required
                          onChange={(e) => {
                            setMembers(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="employeeNIC" className="form-label">
                          Community ID:{" "}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 h-50 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          defaultValue={picture}
                          required
                          onChange={(e) => {
                            setpicture(e.target.value);
                          }}
                        />
                      </div>

                      {/* <div className="mb-3">
                        <label
                          htmlFor="image"
                          //className="mt-1  bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeNameWithInitials"
                        >
                          Community Logo:
                        </label>
                        <div
                          className="flex items-center justify-center gap-5"
                          style={{
                            cursor: "pointer",
                            // backgroundColor: "#5a5a5a",
                            borderRadius: "8px",
                            color: "#6b7280",
                          }}
                          onClick={() => filepickerRef.current.click()}
                        >
                          {postImage && postImage.length > 0 ? (
                            postImage.map((image) => (
                              <img
                                style={{
                                  width: "150px",
                                  borderRadius: "8px",
                                }}
                                src={image}
                                alt="uploadedImage"
                              />
                            ))
                          ) : (
                            <div className="p-2.5 w-full flex flex-col items-center justify-center py-9 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                              <svg
                                aria-label="Icon to represent media such as images or videos"
                                className="_8-yf5"
                                color="#6b7280"
                                fill="#6b7280"
                                height="77"
                                role="img"
                                viewBox="0 0 97.6 77.3"
                                width="96"
                              >
                                <path
                                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                                  //   fill="currentColor"
                                ></path>
                                <path
                                  d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                                  //   fill="currentColor"
                                ></path>
                                <path
                                  d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                                  //   fill="currentColor"
                                ></path>
                              </svg>
                              <br />
                              <p>Upload images here</p>
                            </div>
                          )}
                          <input
                            style={{ display: "none" }}
                            onChange={uploadPostImage}
                            ref={filepickerRef}
                            type="file"
                            multiple
                            hidden
                            //required
                          />
                        </div> 
                      </div>*/}
                      <button
                        type="submit"
                        className="bg-pink-400 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-pink-300"
                      >
                        Update Community
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

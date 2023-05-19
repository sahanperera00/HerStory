import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Header, Navbar, Footer, ThemeSettings } from "../../components/index";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function CommunityNew(
  postImage,
  uploadPostImage,
  filepickerRef
) {
  // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const navigate = useNavigate();
  const [comID, setComID] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  // const [Members, setMembers] = useState("");
  const [picture, setPicture] = useState("");

  const handleFileUpload = async (event) => {
    // setLoading(true);
    const file = event.target.files[0];
    const path = `/images/${file.name}`;
    const storageRef = ref(storage, path);

    const uploadResponse = await uploadBytes(storageRef, file);

    if (uploadResponse) {
      const url = await getDownloadURL(ref(storage, path));
      setPicture(url);
      // setLoading(false);
    }
  };
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
                    Add New Community
                  </h2>
                  <div className=" flex items-center justify-center ">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newCommunity = {
                          comID,
                          name,
                          description,
                          // Members,
                          picture,
                        };

                        axios
                          .post(
                            "http://localhost:8070/community/",
                            newCommunity
                          )
                          .then(() => {
                            Swal.fire({
                              icon: "success",
                              title: "Data Successfully Saved",
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
                          required
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                        />
                      </div>

                      {/* <div className="mb-3">
                        <label htmlFor="employeeNIC" className="form-label">
                          Community ID:{" "}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 h-50 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          required
                          onChange={(e) => {
                            setMembers(e.target.value);
                          }}
                        />
                      </div> */}

                      <div className="mb-3">
                        <label htmlFor="employeeNIC" className="form-label">
                          Picture:{" "}
                        </label>
                        <input
                          type="file"
                          className="mt-1 block w-800 h-50 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          required
                          onChange={(event) => handleFileUpload(event)}
                        />
                      </div>

                    
                      <button
                        type="submit"
                        className="bg-pink-400 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-pink-300"
                      >
                        Add Community
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

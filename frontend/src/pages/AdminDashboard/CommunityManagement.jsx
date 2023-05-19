import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Modal, Input, Button, Upload } from "antd";
import { FiSettings } from "react-icons/fi";
import {
  DashTopButton,
  DashTopBox,
  Navbar,
  Footer,
  ThemeSettings,
} from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdPostAdd } from "react-icons/md";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

export default function CommunityManagement() {
  const navigate = useNavigate(); //useNavigate hook to redirect to another page after form submission is successful
  const [community, setcommunity] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comID, setComID] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [picture, setpicture] = useState("");
  const [Members, setMembers] = useState("");

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  var date = new Date().toISOString().split("T")[0];

  const getcommunity = async () => {
    //getcommunity is the function to get the data from the backend
    axios
      .get("http://localhost:8070/community/")
      .then((res) => {
        setcommunity(res.data); //setcommunity is used to update the state variable
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

  const deleteCommunity = async (id) => {
    await axios
      .delete(`http://localhost:8070/community/${id}`)
      .then((res) => {
        getcommunity();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const confirmFunc = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "#f8f9fa",
      background: "#6c757d",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommunity(id);
        Swal.fire({
          icon: "success",
          title: "Data Successfully Deleted",
          color: "#f8f9fa",
          background: "#6c757d",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Link("/admin/community-management");
      }
    });
  };
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

                <div className=" flex m-3  flex-1 items-end justify-left">
                  <Link to="/admin/new-community">
                    <button
                      ///onClick={showModal}
                      className="inline-block bg-pink-400 h-[40px] w-[150px] rounded-[8px] px-3 py-1 text-[15px] font-medium bottom-[80px] text-[#FFFFFF] mt-[20px] ml-[0px] "
                    >
                      +Community
                    </button>
                  </Link>
                </div>

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Community ID" />
                        <TableHeader value="Community Title" />
                        <TableHeader value="Date Created" />
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
                              <TableData value={data.comID} />
                              <TableData value={data.name} />
                              <TableData value={date} />

                              <TableData
                                value={
                                  <div className="flex gap-4">
                                    <Link
                                      to={`/admin/CommunityEdit/${data._id}`}
                                    >
                                      <button
                                        className="text-white bg-[rgb(121,205,222)] p-2 rounded-full hover:bg-[rgb(121,205,222)]"
                                        title="Edit"
                                      >
                                        <AiOutlineEdit />
                                      </button>
                                    </Link>
                                    <button
                                      onClick={() => {
                                        confirmFunc(data._id);
                                      }}
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

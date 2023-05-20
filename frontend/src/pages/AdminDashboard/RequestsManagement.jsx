import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings, Button } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import axios from "axios";

export default function RequestsManagement() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [requests, setRequests] = useState([]);
  const [state, setState] = useState(false);

  const getdob = (dob) => {
    const date = new Date(dob).toISOString().substring(0, 10);
    return date;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/counsellor/notApproved")
      .then((res) => {
        setRequests(res.data.counsellorInfo);
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
                <Header title="Requests Management" />

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
                      {requests &&
                        requests.length > 0 &&
                        requests.map((data) => {
                          return (
                            <tr
                              key={data._id}
                              className="bg-white hover:bg-[#fcfcfc] border-b-2 border-gray-200 dark:bg-slate-800"
                            >
                              <TableData
                                value={
                                  data.user.firstName + " " + data.user.lastName
                                }
                              />
                              <TableData value={data.user.email} />
                              <TableData value={getdob(data.dob)} />
                              <TableData value={data.category} />
                              <TableData value={data.phoneNumber} />
                              <TableData
                                value={
                                  <div className="flex gap-4">
                                    <button
                                      className="text-white bg-[#cbcb6d] p-2 rounded-full hover:bg-[#cbcb6d]"
                                      title="View"
                                    >
                                      <BiDetail />
                                    </button>
                                    <button
                                      onClick={() => {
                                        axios
                                          .post(
                                            `http://localhost:8070/counsellor/${data._id}`,
                                            { isApproved: "true" }
                                          )
                                          .then(() => {
                                            setState(!state);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          });
                                      }}
                                      className="text-white bg-[#79de79] p-2 rounded-full hover:bg-[#79de79]"
                                      title="Accept"
                                    >
                                      <AiOutlineCheck />
                                    </button>
                                    <button
                                      onClick={() => {
                                        axios
                                          .delete(
                                            `http://localhost:8070/counsellor/${data._id}`
                                          )
                                          .then(() => {
                                            setState(!state);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          });
                                      }}
                                      className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                                      title="Reject"
                                    >
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

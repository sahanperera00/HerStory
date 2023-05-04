import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {BiDetail} from "react-icons/bi";

export default function ComplaintManagement() {
  var date = new Date().toISOString().split("T")[0];
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
      status: "Pending",
    },
    {
      id: 2,
      name: "Devindu Samarasinghe",
      email: "devindu@gmail.com",
      phoneNumber: "0715646235",
      status: "Resolved",
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
              <div>
                <div className="md:m-6 p-5">
                  <Header title=" Complaint Management" />

                  <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Name" />
                        <TableHeader value="Email" />
                        <TableHeader value="Phone Number" />
                        <TableHeader value="Status" />
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
                              <TableData value={data.phoneNumber} />
                              <TableData value={data.status} />
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                  {/* <div className=" flex items-center justify-center ">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const newMachine = {
                          machineID,
                          name,
                          dateOfPurchased,
                          machineryCost,
                          salvage,
                          numberOfYrs,
                          others,
                        };

                        axios
                          .post(
                            "http://localhost:8070/machinery/create",
                            newMachine
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
                            navigate("");
                          })
                          .catch((err) => {
                            console.log(err);
                            alert("Error occured");
                          });
                      }}
                    >
                      <div className="mb-3">
                        <label
                          htmlFor="employeeFullName"
                          className="form-label"
                        >
                          Name :{" "}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeFullName"
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="employeeNIC" className="form-label">
                          Address:{" "}
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeNIC"
                          min={0}
                          required
                          onChange={(e) => {
                            setMachineryCosts(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="employeeDOB" className="form-label">
                          Complaint :{" "}
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeDOB"
                          min={0}
                          required
                          onChange={(e) => {
                            setSalvage(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="employeeDOB" className="form-label">
                          Phone number :{" "}
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          id="employeeDOB"
                          min={0}
                          required
                          onChange={(e) => {
                            setNumberOfYrs(e.target.value);
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-pink-400 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600"
                      >
                        Add Complaint
                      </button>
                    </form>
                  </div> */}


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

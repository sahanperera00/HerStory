import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import CounsellorSidebar from "./CounsellorSidebar";
import { Header, TableHeader, TableData } from "../../components";
import StarRatings from "react-star-ratings";
import { RxEnvelopeClosed, RxEyeOpen, RxEyeNone } from "react-icons/rx";
import axios from "axios";
import jwtDecode from "jwt-decode";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

export default function Feedbacks() {
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

  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      name: "Sahan Perera",
      email: "sahan@gmail.com",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rate: 4.5,
      date: "2022-11-14",
    },
    {
        id: 2,
        name: "Devindu Samarasinghe",
        email: "devindu@gmail.com",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rate: 5,
        date: "2022-09-20",
    },
    {
      id: 3,
      name: "Chanukya Serasinghe",
      email: "chanukya@gmail.com",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rate: 3.5,
      date: "2022-07-14",
    },
    {
        id: 4,
        name: "Nashali Perera",
        email: "nashali@gmail.com",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rate: 5,
        date: "2021-06-24",
    },
    {
      id: 5,
      name: "Chamodh Perera",
      email: "chamodh@gmail.com",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rate: 4,
      date: "2021-03-14",
    },
    {
        id: 6,
        name: "Pasan Induwara",
        email: "pasan@gmail.com",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        rate: 4,
        date: "2021-01-21",
    },
    
];
  
useEffect(() => {
  const userInfo = jwtDecode(localStorage.getItem("token")).object;

  axios
    .get("http://localhost:8070/counsellor/user/user/" + userInfo._id)
    .then((res) => {
      if(!res.data.counsellorInfo.isApproved ) {
        navigate("/counsellor-dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

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
                <Header title="Feedbacks" />

                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Name" />
                        <TableHeader value="Email" />
                        <TableHeader value="Review" />
                        <TableHeader value="Ratings" />
                        <TableHeader value="Date" />
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
                              <TableData value={data.review} />
                              <TableData
                                value={
                                    <StarRatings
                                    starDimension="24px"
                                    starSpacing="0px"
                                    rating={data.rate}
                                    starRatedColor="#feb400"
                                    numberOfStars={5}
                                    name="rating"
                                    />
                                }
                              />
                                <TableData value={data.date} />
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

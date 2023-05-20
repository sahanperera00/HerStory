import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { FaConnectdevelop } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import KG from "../data/KG.png";
import UserProfile from "./UserProfile";
import { useStateContext } from "../contexts/ContextProvider";
import SearchBar from "./homeSection/SearchBar";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
  // <TooltipComponent position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  // </TooltipComponent>
);

export default function Navbar() {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className=" bg-[#f9e9e9]">
      <nav className="max-md:hidden flex w-1/1 items-center justify-around flex-wrap p-3 navbar">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/herstory-6a3c0.appspot.com/o/logo-no-background.png?alt=media&token=08cba1bc-5127-4a4a-8ea6-75cf010b01b1"
            alt="herstory logo"
            className="w-[180px]"
          />
        </Link>
        <div className="search flex w-1/2 justify-evenly">
          <Link
            to="/forum"
            className={`${
              location.pathname === "/forum" ? "bg-pink-300" : "bg-white"
            } px-3 py-2 rounded-sm  mx-2 shadow-md`}
            style={{ borderRadius: "10px" }}
          >
            <AiOutlineHome fontSize="20px" />
          </Link>
          <Link
            to="/Community"
            className={`${
              location.pathname === "/Community" ? "bg-pink-300" : "bg-white"
            } px-3 py-2 rounded-sm mx-2 shadow-md`}
            style={{ borderRadius: "10px" }}
          >
            <FaConnectdevelop fontSize="20px" />
          </Link>
          <Link
            to="/myforum"
            className={`${
              location.pathname === "/myforum" ? "bg-pink-300" : "bg-white"
            } px-3 py-2 rounded-sm mx-2 shadow-md`}
            style={{ borderRadius: "10px" }}
          >
            <BsFilePost fontSize="20px" />
          </Link>
          {/* <Input.Search
            placeholder="Type here to search ..."
            id="search"
            className="pt-[-8px] h-fit text-sm bg-gray-100 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
          <SearchBar />
        </div>
        <div className="flex">
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={user.user.pic}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">
                  Hi, {user.user.firstName}
                </span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {/* {user.userName} */}
                  {/* Michael */}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>

          {isClicked.userProfile && <UserProfile />}
        </div>
      </nav>
    </div>
  );
}

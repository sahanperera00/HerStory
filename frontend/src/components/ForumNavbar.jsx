import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FaConnectdevelop } from "react-icons/fa";
import { BiMessage } from "react-icons/bi";
import { Input, Button, Drawer } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import KG from "../data/KG.png";
import UserProfile from "./UserProfile";
import { useStateContext } from "../contexts/ContextProvider";

export default function Navbar() {
  const { handleClick, isClicked } = useStateContext();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const location = useLocation();
  console.log(location.pathname);
  const [open, setOpen] = useState(false);

  
  return (
    <>
      <nav className=" md:hidden flex w-1/1 items-center justify-start flex-wrap py-3 navbar">
        
        <Input.Search
          placeholder="Type here to search ..."
          id="search"
          className="pt-[-8px] ml-[2.5vw] h-fit w-[60vw] text-sm bg-gray-100 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </nav>
      <nav className="max-md:hidden flex w-1/1 items-center justify-around flex-wrap p-3 navbar">
        <div className="search flex w-1/2 justify-evenly">
          <Link
            to="/home"
            className={`${
              location.pathname === "/home" ? "bg-[#02C8AC]" : ""
            } px-3 py-2 rounded-sm  mx-2 shadow-md`}
            style={{ borderRadius: "10px" }}
          >
            <AiOutlineHome fontSize="20px" />
          </Link>
          <Link
            to="/community"
            className={`${
              location.pathname === "/Community" ? "bg-[#02C8AC]" : ""
            } px-3 py-2 rounded-sm mx-2 shadow-md`}
            style={{ borderRadius: "10px" }}
          >
            <FaConnectdevelop fontSize="20px" />
          </Link>
          <Input.Search
            placeholder="Type here to search ..."
            id="search"
            className="pt-[-8px] h-fit text-sm bg-gray-100 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex">
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={KG}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
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
    </>
  );
}

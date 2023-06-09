import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from ".";
// import { userProfileData } from "../../../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import KG from "../data/KG.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const { currentColor } = useStateContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token")
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [role,setRole] = useState("");
  useEffect(()=>{
    user.user.role === "client" ? setRole("client") : user.user.role === "admin"? setRole("admin") : setRole("counsellor-dashboard"); 
  },[])
  

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img className="rounded-full h-24 w-24" src={user.user.pic} alt="user-profile" />
        <div>
        <Link to={`/${role}`}>
        <p className="font-semibold text-xl text-blue-800 dark:text-gray-200 text-transform: capitalize">
            {user.user.firstName} {user.user.lastName}
          </p>
          </Link>
          <p className="text-gray-500 text-sm dark:text-gray-400 capitalize">
            {user.user.role}
          </p>

          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.user.email}

          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {/* {user.email} */}
            {/* admin@lmc.lk */}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <button
          className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

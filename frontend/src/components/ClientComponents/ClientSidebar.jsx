import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { FiUser,FiSettings } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import {CgCommunity} from "react-icons/cg"
import {SlDiamond} from "react-icons/sl";
 
import {AiOutlineForm} from "react-icons/ai"
import {CiSettings} from "react-icons/ci"
import { MdOutlineForum } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ClientSidebar() {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 px-4 pt-3 pb-2.5 rounded-lg  text-white text-md my-3";
  const normalLink =
    "flex items-center gap-5 px-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700  my-3 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray transition duration-300 ease-in-out";

  return (
    <div className=" h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-center items-center">
            <Link to="/" onClick={handleCloseSideBar}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/herstory-6a3c0.appspot.com/o/logo-no-background.png?alt=media&token=08cba1bc-5127-4a4a-8ea6-75cf010b01b1"
                alt="herstory logo"
                className="w-[200px] my-10"
              />
            </Link>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-5 mx-5">
            <p className="text-[12px] text-gray-400 dark:text-gray-400 mt-4 uppercase">
              Services
            </p>


            <NavLink
              to="/client/complaint"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineForm /> {/*  icon  */}
              <span className="capitalize ">Official Complaints</span>
              {/*  link name  */}
            </NavLink>
              
            <NavLink
              to="/community"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <CgCommunity /> {/*  icon  */}
              <span className="capitalize ">Her-Story Community</span>{" "}
              {/*  link name  */}
            </NavLink>
            
            <NavLink
              to="/counsel"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <BsPeople /> {/*  icon  */}
              <span className="capitalize ">Her-Story Counsellor</span>{" "}
              {/*  link name  */}
            </NavLink>

            <p className="text-[12px] text-gray-400 dark:text-gray-400 mt-4 uppercase">
              HerStory+
            </p>

            <NavLink
              to="/admin/updateProfile"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <SlDiamond /> {/*  icon  */}
              <span className="capitalize ">Become a Member</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/admin/manage-post"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineForum /> {/*  icon  */}
              <span className="capitalize ">Talk with friends</span>{" "}
              {/*  link name  */}
            </NavLink>

            <p className="text-[12px] text-gray-400 dark:text-gray-400 mt-4 uppercase">
              Settings
            </p>
            <NavLink
              to="/updateProfile"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiSettings /> {/*  icon  */}
              <span className="capitalize ">Settings</span>{" "}
              {/*  link name  */}
            </NavLink>

            <div id="dropdown-cta" class="p-4 mt-6 rounded-lg mr-4 " role="alert" style={{background: currentColor, opacity: '50%'}}>
              <div class="flex items-center mb-3">
                <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
              </div>
              <p class="mb-3 text-sm text-black dark:text-black ">
                The current version of HerStory is a prototype and we will be back with a bang! 
              </p>
              <a class="text-sm  underline hover:text-blue-900 text-white dark:hover:text-blue-300" href="https://www.linkedin.com/in/devindusamarasinghe/">Project by Code Crusaders</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

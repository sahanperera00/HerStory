import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../contexts/ContextProvider";

export default function AdminSidebar() {
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
              Complaint Service
            </p>

            <NavLink
              to="/coming-soon"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Complaint Management</span>
              {/*  link name  */}
            </NavLink>

            <p className="text-[12px] text-gray-400 dark:text-gray-400 mt-4 uppercase">
              Counseling Service
            </p>

            <NavLink
              to="/admin/category-management"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Category Management</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/admin/manage-consultants"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Manage Consultants</span>{" "}
              {/*  link name  */}
            </NavLink>

            <p className="text-[12px] text-gray-400 dark:text-gray-400 mt-4 uppercase">
              Forum Management
            </p>
            <NavLink
              to="/admin/manage-community"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Community Management</span>{" "}
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
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Post Management</span>{" "}
              {/*  link name  */}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

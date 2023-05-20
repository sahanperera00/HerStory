import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../contexts/ContextProvider";
import { RxClipboard } from "react-icons/rx";
import { RxLapTimer } from "react-icons/rx";
import { AiOutlineSchedule } from "react-icons/ai";
import { BsChatSquareText } from "react-icons/bs";
import { RiFeedbackLine } from "react-icons/ri";
import { MdOutlineForum } from "react-icons/md";

export default function CounsellorSidebar() {
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
              Counseling Service
            </p>

            {/* <NavLink
              to="/counsellor/manage-appointments"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <RxClipboard />
              <span className="capitalize ">Manage Appointments</span>
            </NavLink> */}

            {/* <NavLink
              to="/counsellor/pending-requests"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <RxLapTimer />
              <span className="capitalize ">Pending Requests</span>
            </NavLink> */}

            <NavLink
              to="/chats"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <BsChatSquareText />
              <span className="capitalize ">Chats</span>
            </NavLink>

            {/* <NavLink
              to="/counsellor/transfers"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <BiTransfer />
              <span className="capitalize ">Transfers</span>
            </NavLink> */}

            <NavLink
              to="/counsellor/feedbacks"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <RiFeedbackLine />
              <span className="capitalize ">Feedbacks</span>
            </NavLink>

            <NavLink
              to="/forum"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineForum />
              <span className="capitalize ">Her-Story Forum</span>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

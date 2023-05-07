import React from "react";
import RightSideBarContainer from "./rightSideBarComponents/RightSideBarContainer";
import RightSideBarContainer2 from "./rightSideBarComponents/RightSideBarContainer2";
const RightSideBar = () => {
  return (
    <div className="max-md:hidden max-xl:right-0 max-xl:w-[30vw] r w-[25vw] p-[15px]  no-scrollbar overflow-y-scroll">
      <RightSideBarContainer title={"Your Communitites"} />
      <RightSideBarContainer2 title={"Your Tags"} />
    </div>
  );
};

export default RightSideBar;

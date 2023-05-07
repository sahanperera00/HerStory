import React from "react";
import ContainerElement from "./ContainerElement";

const RightSideBarContainer = ({ title }) => {
  return (
    <div className=" h-fit w-[88%] rounded-2xl pt-6 shadow-[0px_4px_10px_rgba(0,0,0,0.25)] bg-[#f9e9e9]">
      <div className="text-center text-2xl text-[#777777] font-semibold  font-sans py-2">
        {title}
      </div>
      <ContainerElement />
    </div>
  );
};

export default RightSideBarContainer;

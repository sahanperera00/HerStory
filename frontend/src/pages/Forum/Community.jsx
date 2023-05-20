import Navbar from "../../components/ForumNavbar";
import Communities from "../../components/Communities/Communities";
import { Modal, Input, Button, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
// import YourCommunities from "../../components/Community/yourcommunities";

function Community() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
        <div className="min-[400px]:w-[65%] md:w-[75%] lg:w-[80%] h-fit rounded-[15px]  overflow-hidden shadow-[0px_4px_5px_rgba(0,0,0,0.25)] mx-[36px] my-[16px] bg-[#f9e9e9]">
          <div className="px-5 py-4 my-[10px] ">
            <div className="font-[700] text-[32px] mx-[22px] mt-[5px] ">
              Welcome to Communities
            </div>
            <div className="h-fit text-[20px] text-[#777777] mx-[22px]">
              Follow communities and explore your interests!
            </div>
            <div className=" flex flex-1 items-end justify-between"></div>
          </div>
        </div>
        <Communities />
        {/* <YourCommunities /> */}
      </div>
    </>
  );
}

export default Community;

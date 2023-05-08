//import Navbar from "../../components/Navbar/Navbar";
import React, { useState } from "react";
import Post from "../../components/homeSection/Post";
import RightSideBar from "../../components/homeSection/RightSideBar";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/ForumNavbar";
//import AlertComp from "../../components/Alert";

function Forum() {
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
      <Navbar />
      <div className="container flex mx-auto">
      {success && <AlertComp setSuccess={setSuccess} />}
      {/* <div className="w-full max-xl:w-[100vw] flex flex-row justify-around mr-[30%]"> */}
      <div className="w-[80%]">
        <div className=" h-[100px] w-[93.35%] mx-4 mt-4 p-4 shadow-[0px_4px_10px_rgba(0,0,0,0.25)] rounded-[15px] bg-[#f9e9e9]">
          <div className="inline-block w-[68px] bg-pink-300 h-[68px] rounded-xl"></div>
          <div className="inline-block w-[calc(90%-100px)] h-[68px] p-6 relative -top-7">
            <input
              className="w-[110%] h-[100%]  rounded-lg p-4 border-2 border-gray-300 focus:border-2 focus:border-gray-400 focus:outline-none"
              type="text"
              placeholder="Post something"
              onClick={() => {
                setModalOpen(true);
              }}
            ></input>
          </div>
          <div className="inline-block w-[calc(10%+32px)] h-[100%] relative"></div>
        </div>
        <Post />
      </div>
      <RightSideBar />
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          setSuccess={setSuccess}
          mask="false"
        />
      )}
      {/* </div> */}
      </div>
    </div>
  );
}

export default Forum;

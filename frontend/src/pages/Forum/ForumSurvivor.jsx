//import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Post from "../../components/homeSection/Post";
import RightSideBar from "../../components/homeSection/RightSideBar";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/ForumNavbar";
import axios from "axios";
//import AlertComp from "../../components/Alert";

const ForumSurvivor = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("userInfo")).user;

  useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getPosts = async () => {
      await axios
        .get("http://localhost:8070/posts/category/Survivor", header)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
      <Navbar />
      <div className="container flex mx-auto">
        {/* {success && <AlertComp setSuccess={setSuccess} />} */}
        {/* <div className="w-full max-xl:w-[100vw] flex flex-row justify-around mr-[30%]"> */}
        <div className="w-[100%]">
          <Post posts={posts} />
        </div>
        {/* <RightSideBar /> */}
        {/* </div> */}
      </div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          setSuccess={setSuccess}
          mask="false"
        />
      )}
    </div>
  );
};

export default ForumSurvivor;

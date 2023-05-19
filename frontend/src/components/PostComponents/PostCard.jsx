import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiUpvote, BiDownvote, BiUserCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import axios from "axios";

const PostCard = ({ data }) => {
  const user = JSON.parse(localStorage.getItem("userInfo")).user;
  const [active, isActive] = useState(false);
  const [like, setLike] = useState(data?.likes?.includes(user._id));
  const [dislike, setDislike] = useState(data?.dislikes?.includes(user._id));
  const [likeCount, setLikeCount] = useState(data?.likes?.length || 0);
  const [dislikeCount, setDislikeCount] = useState(data?.dislikes?.length || 0);
  const [animation, setAnimation] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const navigate = useNavigate();

  const header = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
    setActivePostId(postId);
    setTimeout(() => setActivePostId(null), 200);
  };

  const likePost = async (postId) => {
    return await axios.put(
      `http://localhost:8070/posts/like/${postId}`,
      { userId: user._id },
      header
    );
  };

  const unlikePost = async (postId) => {
    return await axios.put(
      `http://localhost:8070/posts/unlike/${postId}`,
      { userId: user._id },
      header
    );
  };

  const dislikePost = async (postId) => {
    return await axios.put(
      `http://localhost:8070/posts/dislike/${postId}`,
      { userId: user._id },
      header
    );
  };

  const undislikePost = async (postId) => {
    return await axios.put(
      `http://localhost:8070/posts/undislike/${postId}`,
      { userId: user._id },
      header
    );
  };

  const toggleLike = (e, postId) => {
    e.stopPropagation();
    if (like) {
      unlikePost(postId);
      setLikeCount(likeCount - 1);
      setLike(false);
    } else {
      likePost(postId);
      setLikeCount(likeCount + 1);
      setLike(true);
      if (dislike) {
        undislikePost(postId);
        setDislike(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };
  const toggleDislike = (e, postId) => {
    e.stopPropagation();
    if (dislike) {
      undislikePost(postId);
      setDislikeCount(dislikeCount - 1);
      setDislike(false);
    } else {
      dislikePost(postId);
      setDislikeCount(dislikeCount + 1);
      setDislike(true);
      if (like) {
        unlikePost(postId);
        setLike(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  return (
    <div
      key={data._id}
      onClick={() => handlePostClick(data._id)}
      className={` 
          ${
            activePostId === 2 ? "border-2 border-pink-300" : ""
          } ml-[19px] mt-[20px] h-fit w-[93%] relative shadow-[0px_4px_10px_rgba(0,0,0,0.25)] rounded-xl p-2 bg-[#f9e9e9] flex`}
    >
      <div className="m-4 inline-block align-top rounded-2xl h-[calc(17vw-32px)]  w-[calc(17vw-32px)] bg-[#f2b8c6] overflow-hidden">
        <img src={data.image} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="h-[calc(17vw-32px)] w-[calc(100%-17vw+32px)] my-4 px-4 flex flex-col justify-between">
        <div className=" w-full relative">
          <div className="  h-fit p-2 pt-0 pl-1">
            <div className="text-2xl font-semibold font-sans text-[#777777]">
              {data.title}
            </div>
          </div>
          <div className="h-fit py-2">
            {data.tags.map((tag, index) => (
              <button
                key={index}
                className="bg-gray-200 hover:bg-gray-300 text-bg-gray-400 hover:text-gray-600 rounded-full px-2 font-sans mx-2"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="h-fit w-[70%] text-base text-[#777777] p-2">
            {data?.description}
          </div>
        </div>
        <div className="mt-auto h-fit   relative">
          <div className="h-12 w-12 rounded-full  mt-1 mx-2 inline-block">
            <img
              src={user?.pic}
              className="h-full w-full object-cover rounded-full"
              alt=""
            />
            {/* <AiOutlineUser className="bg-pink-300 h-full w-full object-cover rounded-full" /> */}
          </div>
          <div className="inline-block w-[calc(100%-192px)]  h-[100%] absolute">
            <div className="h-[50%] text-xs p-2 pb-0 text-[#777777] ">
              {data?.postedBy?.email}
            </div>
            <div className="h-[50%] text-xs p-2 pt-0 text-[#777777]">
              {data.dateCreated
                ? data.dateCreated.toString().split("T")[0]
                : ""}
            </div>
          </div>
          {like ? (
            <>
              <span className="font-bold text-xl  text-[#ea76b8] top-5 right-[158px] absolute">
                {likeCount}
              </span>
              <GoArrowUp
                fill="#ea76b8"
                className={`${
                  animation ? "likeAnimation" : ""
                }  h-10 w-10 absolute top-3 right-[120px] hover:drop-shadow-[0_0_10px_rgba(0,255,0,1)]`}
                onClick={(e) => {
                  toggleLike(e, data._id);
                  setAnimation(true);
                }}
                onAnimationEnd={() => {
                  setAnimation(false);
                }}
              />
            </>
          ) : (
            <>
              <span className="font-bold text-xl  text-[#ea76b8] top-5 right-[158px] absolute">
                {likeCount}
              </span>
              <BiUpvote
                fill="#ea76b8"
                className={`${
                  animation ? "likeAnimation" : ""
                }  h-8 w-8 absolute top-4 right-[124px] hover:drop-shadow-[0_0_10px_rgba(0,255,0,1)]`}
                onClick={(e) => {
                  toggleLike(e, data._id);
                  setAnimation(true);
                }}
                onAnimationEnd={() => {
                  setAnimation(false);
                }}
              />
            </>
          )}
          {dislike ? (
            <>
              <span className="font-bold text-xl text-[#ea76b8] top-5 right-[94px] absolute">
                {dislikeCount}
              </span>
              <GoArrowDown
                fill="#ea76b8"
                className={`${
                  animation2 ? "likeAnimation" : ""
                } h-10 w-10 absolute top-3 right-[58px] hover:drop-shadow-[0_0_10px_rgba(0,255,0,1)]`}
                onClick={(e) => {
                  toggleDislike(e, data._id);
                  setAnimation2(true);
                }}
                onAnimationEnd={() => {
                  setAnimation2(false);
                }}
              />
            </>
          ) : (
            <>
              <span className="font-bold text-xl text-[#ea76b8] top-5 right-[94px] absolute">
                {dislikeCount}
              </span>
              <BiDownvote
                onClick={(e) => {
                  toggleDislike(e, data._id);
                  setAnimation2(true);
                }}
                onAnimationEnd={() => {
                  setAnimation2(false);
                }}
                fill="#ea76b8"
                className={`${
                  animation2 ? "likeAnimation" : ""
                } h-8 w-8 absolute top-4 right-[62px] hover:drop-shadow-[0_0_10px_rgba(0,255,0,1)]`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

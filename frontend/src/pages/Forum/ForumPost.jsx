import React, { useEffect, useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { BsFillChatLeftFill } from "react-icons/bs";
import Navbar from "../../components/ForumNavbar";
import Comments from "../../components/Comments/Comments";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

const Post = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Violence against women isn't cultural, it's criminal.",
  //     email: "Chanukya@gmail.com",
  //     date: "2023-02-05",
  //   },
  // ];
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [comments, setComments] = useState([]);

  const { postId } = useParams();

  const user = JSON.parse(localStorage.getItem("userInfo")).user;

  const isClientsPost = user?.email === post?.postedBy?.email;

  const header = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`http://localhost:8070/posts/${postId}`, header)
        .then((res) => {
          setPost(res.data);
          setLikeCount(res.data?.likes?.length || 0);
          setDislikeCount(res.data?.dislikes?.length || 0);
          setLike(res.data?.likes?.includes(user._id));
          setDislike(res.data?.dislikes?.includes(user._id));
          setComments(res.data?.comments);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPost();
  }, [postId, user._id]);

  console.log(post);

  const confirmFunc = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "#f8f9fa",
      background: "#6c757d",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:8070/posts/${postId}`,
          header
        );
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Post Successfully Deleted",
          color: "#f8f9fa",
          background: "#6c757d",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        //navigate('/MachineryViewAll');
      }
    });
  };

  const likePost = async () => {
    return await axios.put(
      `http://localhost:8070/posts/like/${postId}`,
      { userId: user._id },
      header
    );
  };

  const unlikePost = async () => {
    return await axios.put(
      `http://localhost:8070/posts/unlike/${postId}`,
      { userId: user._id },
      header
    );
  };

  const dislikePost = async () => {
    return await axios.put(
      `http://localhost:8070/posts/dislike/${postId}`,
      { userId: user._id },
      header
    );
  };

  const undislikePost = async () => {
    return await axios.put(
      `http://localhost:8070/posts/undislike/${postId}`,
      { userId: user._id },
      header
    );
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    if (like) {
      unlikePost();
      setLikeCount(likeCount - 1);
      setLike(false);
    } else {
      likePost();
      setLikeCount(likeCount + 1);
      setLike(true);
      if (dislike) {
        undislikePost();
        setDislike(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };
  const toggleDislike = (e) => {
    e.stopPropagation();
    if (dislike) {
      undislikePost();
      setDislikeCount(dislikeCount - 1);
      setDislike(false);
    } else {
      dislikePost();
      setDislikeCount(dislikeCount + 1);
      setDislike(true);
      if (like) {
        unlikePost();
        setLike(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
      <Navbar />
      <div
        key={2}
        className={` 
           ml-[200px] mt-[30px] h-fit w-[79%] relative shadow-[0px_4px_10px_rgba(0,0,0,0.25)] rounded-xl p-8 bg-[#f9e9e9]`}
      >
        <div className="inline-block align-top rounded-2xl h-[calc(17vw-32px)]  w-[calc(17vw-32px)] bg-[#f2b8c6] overflow-hidden">
          <img src={post.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="inline-block h-fit w-[calc(100%-17vw+32px)] pl-6">
          <div className=" w-full h-full relative">
            <div className="  h-fit p-2 pt-0 pl-1">
              <div className="text-2xl font-semibold font-sans text-[#777777]">
                {post?.title}
              </div>
            </div>
            <div className="h-fit p-2">
              {isClientsPost && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-white bg-[rgb(130,133,133)] p-2 rounded-full hover:bg-[rgb(121,205,222)]"
                    title="Edit"
                  >
                    <AiOutlineEdit />
                  </button>

                  <button
                    className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                    title="Remove"
                    onClick={() => {
                      confirmFunc(post?.id);
                    }}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </div>
              )}
            </div>
            <div className="h-fit w-[90%] text-base text-[#777777] p-2">
              {post?.description}
            </div>
            <div className="w-[90%] text-base text-[#777777] p-2">
              {post.content}
            </div>
            <div className="mt-4 h-fit   relative">
              <div className=" h-12 w-12 rounded-full  mt-1 mx-2 inline-block">
                <img
                  src={user?.pic}
                  className="h-full w-full object-cover rounded-full"
                  alt=""
                />
              </div>

              <div className="inline-block w-[calc(100%-192px)]  h-[100%] absolute">
                <div className="h-[50%] text-xs p-2 pb-0 text-[#777777]">
                  {post?.postedBy?.email}
                </div>
                <div className="h-[50%] text-xs p-2 pt-0 text-[#777777]">
                  {post && post.dateCreated
                    ? post.dateCreated.toString().split("T")[0]
                    : ""}
                </div>
              </div>
              {like ? (
                <>
                  <span className="font-bold text-xl  text-[#ea76b8] top-5 right-[158px] absolute">
                    {likeCount}
                  </span>
                  <GoArrowUp
                    fill="#02C8AC"
                    className={`${
                      animation ? "likeAnimation" : ""
                    }  h-10 w-10 absolute top-3 right-[120px] hover:drop-shadow-[0_0_10px_rgba(0,255,0,1)]`}
                    onClick={(e) => {
                      toggleLike(e);
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
                      toggleLike(e);
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
                    fill="#02C8AC"
                    className={`${
                      animation2 ? "likeAnimation" : ""
                    } h-10 w-10 absolute top-3 right-[58px] hover:drop-shadow-[0_0_10px_rgba(0,255,0,1)]`}
                    onClick={(e) => {
                      toggleDislike(e);
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
                      toggleDislike(e);
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
        <Comments comments={comments} setComments={setComments} />
      </div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          setSuccess={setSuccess}
          mask="false"
          postId={postId}
          post={post}
        />
      )}
    </div>
  );
};

export default Post;

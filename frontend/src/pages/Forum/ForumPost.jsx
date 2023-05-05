import React, { useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { BsFillChatLeftFill } from "react-icons/bs";
import Navbar from "../../components/ForumNavbar";
import Comments from "../../components/Comments/Comments";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Post = () => {
  const posts = [
    {
      id: 1,
      title: "Violence against women isn't cultural, it's criminal.",
      email: "Chanukya@gmail.com",
      date: "2023-02-05",
    },
  ];

  const [active, isActive] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  const confirmFunc = (id) => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        //deleteMachinery(id);
        Swal.fire({
          icon: "success",
          title: "Data Successfully Deleted",
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

  const handlePostClick = (postId) => {
    setActivePostId(postId);
    setTimeout(() => setActivePostId(null), 200);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    if (like) {
      setLikeCount(likeCount - 1);
      setLike(false);
    } else {
      setLikeCount(likeCount + 1);
      setLike(true);
      if (dislike) {
        setDislike(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };
  const toggleDislike = (e) => {
    e.stopPropagation();
    if (dislike) {
      setDislikeCount(dislikeCount - 1);
      setDislike(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setDislike(true);
      if (like) {
        setLike(false);
        setLikeCount(likeCount - 1);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div
        key={2}
        onClick={() => handlePostClick(2)}
        className={` 
           ml-[19px] mt-[20px] h-fit w-[97%] relative shadow-[0px_4px_10px_rgba(0,0,0,0.25)] rounded-xl p-8`}
      >
        <div className="mt-4 inline-block align-top rounded-2xl h-[calc(17vw-32px)]  w-[calc(17vw-32px)] bg-[#f2b8c6]"></div>
        {posts.map((data) => (
          <div className=" inline-block h-fit w-[calc(100%-17vw+32px)] px-4">
            <div className=" w-full h-full relative">
              <div className="  h-fit p-2 pt-0 pl-1">
                <div className="text-2xl font-semibold font-sans text-[#777777]">
                  Violence against women isn't cultural, it's criminal.
                </div>
              </div>
              <div className="h-fit p-2">
                <div className="flex gap-4">
                  <button
                    className="text-white bg-[rgb(130,133,133)] p-2 rounded-full hover:bg-[rgb(121,205,222)]"
                    title="Edit"
                  >
                    <AiOutlineEdit />
                  </button>

                  <button
                    className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                    title="Remove"
                    onClick={() => {
                      confirmFunc(data.id);
                    }}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </div>
              </div>
              <div className="h-fit w-[70%] text-base text-[#777777] p-2">
                Equality cannot come eventually, it's something we must fight
                for now. Violence against women can end only when the culprits
                get punished.Over a quarter of women aged15-49 years who have
                been in a relationship have been subjected to physical and/or
                sexual violence by their intimate partner at least once in their
                lifetime (since age 15). The prevalence estimates of lifetime
                intimate partner violence range from 20% in the Western Pacific,
                22% in high-income countries and Europe and 25% in the WHO
                Regions of the Americas to 33% in the WHO African region, 31% in
                the WHO Eastern Mediterranean region, and 33% in the WHO
                South-East Asia region. Globally as many as 38% of all murders
                of women are committed by intimate partners. In addition to
                intimate partner violence, globally 6% of women report having
                been sexually assaulted by someone other than a partner,
                although data for non-partner sexual violence are more limited.
                Intimate partner and sexual violence are mostly perpetrated by
                men against women. Lockdowns during the COVID-19 pandemic and
                its social and economic impacts have increased the exposure of
                women to abusive partners and known risk factors, while limiting
                their access to services. Situations of humanitarian crises and
                displacement may exacerbate existing violence, such as by
                intimate partners, as well as non-partner sexual violence, and
                may also lead to new forms of violence against women.
              </div>
              <div className="mt-4 h-fit   relative">
                <div className="bg-pink-400 h-12 w-12 rounded-full  mt-1 mx-2 inline-block"></div>
                <div className="inline-block w-[calc(100%-192px)]  h-[100%] absolute">
                  <div className="h-[50%] text-xs p-2 pb-0 text-[#777777]">
                    Chanukya Serasinghe
                  </div>
                  <div className="h-[50%] text-xs p-2 pt-0 text-[#777777]">
                    2 days ago
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
        ))}
        <Comments />
      </div>
    </>
  );
};

export default Post;

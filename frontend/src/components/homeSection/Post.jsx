import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../PostComponents/PostCard";

const Post = ({ posts }) => {
  const [active, isActive] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
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

  console.log(posts);

  return (
    <div className=" h-[100vh] overflow-y-scroll overflow-x-hidden ">
      {posts?.map((data) => (
        <PostCard key={data._id} data={data} />
      ))}
    </div>
  );
};

export default Post;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../PostComponents/PostCard';

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

	// const posts = [
	//   {
	//     id: 1,
	//     title: "Violence against women isn't cultural, it's criminal.",
	//     desc: "Equality cannot come eventually, it's something we must fight for now. Violence against women can end only when the culprits get punished.",
	//     username: "Chanukya@gmail.com",
	//     days: "2 days ago",
	//   },
	//   {
	//     id: 2,
	//     title:
	//       "Women's mental health is an important element in one's overall well-being and contentedness",
	//     desc: " it maintains cognitive alternates, emotional sanity, and balance of ourselves, lives, and relationships. When one is mentally balanced and at peace with themselves internally, they are practicing good mental health.",
	//     username: "Nashali.P@gmail.com",
	//     days: "8 days ago",
	//   },
	//   {
	//     id: 3,
	//     title: "Why We Need To Pay Attention to Women's Mental Health",
	//     desc: " Newer research suggests women are more prone to psychological problems, such as depression, largely due in part to differences in the brains of ...",
	//     username: "Ximena Botfago",
	//     days: "10 days ago",
	//   },
	// ];
  

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
			{posts?.map((data) => <PostCard key={data._id} data={data}/>)}
		</div>
	);
};

export default Post;

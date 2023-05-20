import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ForumPost({ comments, setComments }) {
  const [isOpen, setIsOpen] = useState(false);

  const { postId } = useParams();

  const user = JSON.parse(localStorage.getItem("userInfo")).user;

  const header = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  var date = new Date().toISOString().split("T")[0];

  const makeComment = async (event) => {
    event.preventDefault();
    const comment = {
      text: event.target.comment.value,
      postedBy: user,
    };

    try {
      const response = await axios.put(
        `http://localhost:8070/posts/comment/${postId}`,
        {
          comment: comment,
        },
        header
      );

      console.log(response);
      if (response.status === 200) {
        setComments([...comments, comment]);
        event.target.comment.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <section className="bg-white dark:bg-gray-900 py-8 lg:py-16"> */}
      {/* <div className="max-w-2xl mx-auto px-4"> */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          <br />
          Discussion ({comments?.length || 0})
        </h2>
      </div>
      <form onSubmit={(event) => makeComment(event)} className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            name="comment"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-pink-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
      {comments?.map((comment, index) => (
        <article
          key={index}
          className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={comment?.postedBy?.pic}
                  alt="Michael Gough"
                />
                {comment?.postedBy?.firstName} {comment?.postedBy?.lastName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time>{date}</time>
              </p>
            </div>
            <button
              id="dropdownComment1Button"
              data-dropdown-toggle="dropdownComment1"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              <span className="sr-only" style={{ backgroundColor: "Black" }}>
                Comment settings
              </span>
            </button>

            {isOpen && (
              <div
                id="dropdownComment1"
                className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </footer>

          <p className="text-gray-500 dark:text-gray-400">{comment?.text}</p>
        </article>
      ))}
    </>
  );
}

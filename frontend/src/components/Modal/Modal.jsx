import React, { useState } from "react";
import "../../index.css";
//import AlertComp from "../Alert";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Modal({ setOpenModal, setSuccess, postId, post }) {
  const [tags, setTags] = useState(post?.tags || []);
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [category, setCategory] = useState(post?.category || "");
  const [content, setContent] = useState(post?.content || "");
  const [dateCreated, setdateCreated] = useState(post?.dateCreated || "");
  const [image, setImage] = useState(post?.image || "");
  const [loading, setLoading] = useState(false);

  const header = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const user = JSON.parse(localStorage.getItem("userInfo")).user;

  const handleFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const path = `/images/${file.name}`;
    const storageRef = ref(storage, path);

    const uploadResponse = await uploadBytes(storageRef, file);

    if (uploadResponse) {
      const url = await getDownloadURL(ref(storage, path));
      setImage(url);
      setLoading(false);
    }
  };

  const postData = {
    postedBy: user,
    title,
    description,
    category,
    image,
    tags,
    content,
  };

  const handlePost = async () => {
    let res;

    try {
      if (postId) {
        res = await axios.put(
          `http://localhost:8070/posts/${postId}`,
          postData,
          header
        );
      } else {
        res = await axios.post("http://localhost:8070/posts", postData, header);
      }
    } catch (error) {
      console.log(error);
    }

    if (res.status === 201 || res.status === 200) {
      setOpenModal(false);
      setSuccess(true);
      window.location.reload();
    }
  };

  return (
    <div className="modal h-screen w-full scale-x-110 fixed top-0  flex justify-center items-center bg-black bg-opacity-50   ">
      <div className="modal-container bg-gray-100 top-0 scale-x-[90%] mx-auto px-6 py-4 rounded-lg shadow-xl overflow-y-auto sm:px-8 sm:py-6 lg:py-7 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-black" Title></div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="text-pink-600 text-xl font-semibold -mr-4 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
          >
            <GrClose />
          </button>
        </div>

        <label className="block text-black text-sm font-bold mb-2">Title</label>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
        />
        <label className="block text-black text-sm font-bold mt-4 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
        />
        <label className="block text-black text-sm font-bold mt-4 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
        />
        <label className="block text-black text-sm font-bold mt-4 mb-2">
          Category
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
        >
          <option value="Select">Select</option>
          <option value="Survivor">Survival</option>
          <option value="Legal">Legal</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Education">Education</option>
          <option value="Workplace Harassments">Workplace Harassments</option>
        </select>
        <label className="block text-black text-sm font-bold mt-4 mb-2">
          Date Created
        </label>
        <input
          type="date"
          onChange={(e) => setdateCreated(e.target.value)}
          className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
        />
        <div className="my-4">
          <div className="text-gray-100 text-lg leading-relaxed">
            {tags?.map((tag) => (
              <button
                key={tag}
                className="inline-block bg-gray-600 focus:outline-none focus:shadow-outline-gray hover:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="my-4">
          <label className="block text-black text-sm font-bold mb-2">
            Attachments
          </label>
          <input
            onChange={(event) => handleFileUpload(event)}
            type="file"
            multiple
            className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
          />
        </div>
        <div className="flex justify-between mt-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setTags([...tags, event.target.elements.tag.value]);
              event.target.reset();
            }}
          >
            <label className="tag text-black text-sm font-bold mb-2">
              Add tag
            </label>
            <input
              type="text"
              name="tag"
              className="w-full py-2 px-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-blue"
            />
            <button
              type="submit"
              className="text-white font-bold py-2 px-4 rounded-xl bg-pink-400 hover:bg-pink-500 focus:outline-none focus:shadow-outline-blue mt-3 "
            >
              Add Tag
            </button>
            <button
              onClick={() => handlePost()}
              className="text-white font-bold py-1 mt-3 ml-4 h-10 px-5  rounded-xl bg-pink-400 hover:bg-pink-500 focus:outline-none focus:shadow-outline-blue "
            >
              {loading ? "Uploading Photo..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;

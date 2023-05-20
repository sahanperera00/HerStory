import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtdecode from "jwt-decode";
import axios from "axios";

const CounsellorProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtdecode(token);
    console.log(decoded.object._id);

    axios
      .get("http://localhost:8070/user/" + decoded.object._id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="pb-16 px-10">
        <div className="p-8 bg-white shadow mt-24 dark:bg-gray-700">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl dark:text-gray-400">
                  {/* 22 */}
                </p>{" "}
                <p className="text-gray-400 dark:text-gray-200">
                  {/* Post impressions */}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl dark:text-gray-400">
                  {/* 10 */}
                </p>{" "}
                <p className="text-gray-400 dark:text-gray-200 ">
                  {/* Forum Threads */}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl dark:text-gray-400">
                  {/* 0 */}
                </p>{" "}
                <p className="text-gray-400 dark:text-gray-200">
                  {/* Filed Complaints */}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="overflow-hidden w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img className="w-48" src={user.pic} alt="userprofilepic" />
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              
              <br /><br />
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700 dark:text-gray-200">
              {user.firstName} {user.lastName},{" "}
              <span className="font-light text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3 dark:text-gray-400">
              Colombo, Sri Lanka
            </p>{" "}
            <p className="mt-8 text-gray-500">
              System {user.role}
            </p>
          </div>{" "}
          <div className="mt-12 flex flex-col justify-center">
            {" "}
            <p className="text-gray-600 text-center font-light lg:px-16 dark:text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>{" "}
            {/* <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              {" "}
              Show more
            </button>{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorProfile;

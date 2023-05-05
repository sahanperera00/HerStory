import React from "react";
import { ContextProvider, useStateContext } from "../../contexts/ContextProvider";
import {Link} from "react-router-dom"

const ClientProfile = () => {

    const {currentColor} = useStateContext();
  return (
    <div>
      <div class="pb-16 px-10">
        <div class="p-8 bg-white shadow mt-24 dark:bg-gray-700">
          {" "}
          <div class="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl dark:text-gray-400">22</p>{" "}
                <p class="text-gray-400 dark:text-gray-200">Post impressions</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl dark:text-gray-400">10</p>{" "}
                <p class="text-gray-400 dark:text-gray-200 ">Forum Threads</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p class="font-bold text-gray-700 text-xl dark:text-gray-400">0</p>{" "}
                <p class="text-gray-400 dark:text-gray-200">Filed Complaints</p>{" "}
              </div>{" "}
            </div>{" "}
            <div class="relative">
              {" "}
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <Link to="/updateClient">
            
              <button className="text-white py-2 px-4 uppercase rounded text-sm hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              style={{background: currentColor}}>
                {" "}
                Update your profile
              </button>{" "}
              </Link>

              <Link to="/client">
              <button class="text-white py-2 px-4 uppercase rounded text-sm bg-green-400 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Contact Support
              </button>{" "}

              </Link>
            </div>{" "}
          </div>{" "}
          <div class="mt-20 text-center border-b pb-12">
            {" "}
            <h1 class="text-4xl font-medium text-gray-700 dark:text-gray-200">
              Devindu Samarasinghe, <span class="font-light text-gray-500 dark:text-gray-400">24</span>
            </h1>{" "}
            <p class="font-light text-gray-600 mt-3 dark:text-gray-400">Colombo, Sri Lanka</p>{" "}
            <p class="mt-8 text-gray-500">
              Software Engineering Undergraduate</p>
          </div>{" "}
          <div class="mt-12 flex flex-col justify-center">
            {" "}
            <p class="text-gray-600 text-center font-light lg:px-16 dark:text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>{" "}
            <button class="text-indigo-500 py-2 px-4  font-medium mt-4">
              {" "}
              Show more
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;

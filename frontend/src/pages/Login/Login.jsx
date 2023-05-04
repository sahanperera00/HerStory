import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="signin">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/herstory-6a3c0.appspot.com/o/logo-no-background.png?alt=media&token=08cba1bc-5127-4a4a-8ea6-75cf010b01b1"
            alt="herstory logo"
            className="w-80 my-5"
          />
        </Link>
        <div className="w-full  bg-[#f9e9e9] rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Eg:- sample@mail.com"
                  required="required"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="required"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />

              <button className="w-full text-white bg-[#ef86c1] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Log in
              </button>

              <div className="grid grid-cols-3 gap-5">
                <Link to={"/consultant-signup"}>
                  <Button
                    text={"Register as a Consultant"}
                    bgColor={"#ef86c1"}
                    borderRadius={"10px"}
                    color={"white"}
                  />
                </Link>

                <Link to={"/client-signup"}>
                  <Button
                    text={"Register as a Client"}
                    bgColor={"#ef86c1"}
                    borderRadius={"10px"}
                    color={"white"}
                  />
                </Link>

                <Button
                  text={"Client Dashboard"}
                  bgColor={"#ef86c1"}
                  borderRadius={"10px"}
                  color={"white"}
                />
                <Link to={"/counsellor-dashboard"}>
                  <Button
                    text={"Counsellor Dashboard"}
                    bgColor={"#ef86c1"}
                    borderRadius={"10px"}
                    color={"white"}
                  />
                </Link>
                <Link to={"/admin"}>
                  <Button
                    text={"Admin Dashboard"}
                    bgColor={"#ef86c1"}
                    borderRadius={"10px"}
                    color={"white"}
                  />
                </Link>
                <Link to={"/forum"}>
                  <Button
                    text={"Forum"}
                    bgColor={"#ef86c1"}
                    borderRadius={"10px"}
                    color={"white"}
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

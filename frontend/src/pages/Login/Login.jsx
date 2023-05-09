import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import jwtdecode from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8070/user/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.role === "client") {
          navigate("/client");
        } else if (res.data.user.role === "admin") {
          navigate("/admin");
        } else if (res.data.user.role === "counsellor") {
          navigate("/counsellor-dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwtdecode(localStorage.getItem("token"));

      if (decodedToken.object.role == "client") {
        navigate("/client");
      } else if (decodedToken.object.role == "admin") {
        navigate("/admin");
      } else if (decodedToken.object.role == "counsellor") {
        navigate("/counsellor-dashboard");
      }
    }
  }, []);

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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Eg:- sample@mail.com"
                  required="required"
                  onChange={(e) => {
                    if (validator.isEmail(e.target.value)) {
                      setEmail(e.target.value);
                    } else {
                      setEmail("");
                    }
                  }}
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

              <button
                onSubmit={submitHandler}
                className="w-full text-white bg-[#ef86c1] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </button>

              <div className="flex items-center justify-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                </span>
              </div>
              <div className="flex items-center justify-center mt-4 gap-5 text-gray-500 dark:text-gray-400 ">
                <Link to="/client-signup" className="text-sm hover:underline">
                  Sign up as a Client
                </Link>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  or
                </span>
                <Link
                  to="/consultant-signup"
                  className="text-sm hover:underline"
                >
                  Sign up as a Consultant
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

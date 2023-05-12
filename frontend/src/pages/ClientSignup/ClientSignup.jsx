import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import jwtdecode from "jwt-decode";

export default function ClientSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8070/user/register", {
        firstName,
        lastName,
        role: "client",
        email,
        password,
      })
      .then(() => {
        navigate("/login");
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
    <div className="signup">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
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
        <div className="w-[30%] bg-[#f9e9e9] rounded-lg shadow-lg dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your Account
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  
                  <div className="sm:col-span-2 flex flex-row gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Eg:- John"
                        required="required"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        pattern="[a-z,A-Z]+"
                        title="Must contain only letters"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Eg:- Doe"
                        required="required"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        pattern="[a-z,A-Z]+"
                        title="Must contain only letters"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
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
                      placeholder="Eg:- samaple@mail.com"
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
                  <div className="col-span-2">
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      minLength="8"
                      title="Password must be minimum of 8 characters"
                    />
                  </div>
                  <button
                    type="submit"
                    className="col-span-2 mt-4 text-white bg-[#ef86c1] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create Account
                  </button>
                  <p className="text-sm col-span-2 text-center font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Log in here
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

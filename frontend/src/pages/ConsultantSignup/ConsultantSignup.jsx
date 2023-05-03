import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";

export default function ConsultantSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="signup my-[50px]">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
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
          <div className="container grid grid-cols-2 bg-white flex flex-row rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your Account
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2 flex flex-row gap-4">
                      <div className="w-full">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Full Name
                        </label>
                        <input
                          type="firstName"
                          name="firstName"
                          id="firstName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Eg:- John Doe"
                          required="required"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          pattern="[a-z,A-Z]+"
                          title="Must contain only letters"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex flex-row gap-4">
                      <div className="w-1/2">
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
                          placeholder="Eg:- samaple@mail.com"
                          required="required"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          pattern="[._a-z0-9]+@+[a-z]+.com"
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone Number
                        </label>
                        <input
                          type="String"
                          name="phone"
                          id="phone"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Eg:- 071XXXXXXX"
                          required="required"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex flex-row gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="dob"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required="required"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Gender
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required="required"
                          onChange={(e) => {
                            setRole(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex flex-row gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="nationality"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nationality
                        </label>
                        <input
                          type="String"
                          name="nationality"
                          id="nationality"
                          placeholder="Eg:- Sri Lankan"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required="required"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          minLength="6"
                          title="Password must be minimum of 6 characters"
                        />
                      </div>

                      <div className="w-1/2">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required="required"
                          onChange={(e) => {
                            setRole(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="male">Legal consultation</option>
                          <option value="female">Counseling and therapy</option>
                          <option value="other">
                            Self-defense and safety training
                          </option>
                          <option value="other">
                            Workplace harassment consultation
                          </option>
                          <option value="other">
                            Safety planning and support
                          </option>
                        </select>
                      </div>

                      </div>
                      <div className="sm:col-span-2 flex flex-row gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="........"
                          required="required"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="phone"
                          id="phone"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="........"
                          required="required"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Educational Background
              </h1>
              <div className="grid gap-3">
                <div className="">
                  <div className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-solid bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease">
                    {/* Institution Name
                    Degree Type
                    Field of Study
                    Year Graduated */}
                    <div className="flex flex-row justify-between items-center w-[90%] h-[80px]">
                      <div className="flex flex-col justify-center items-start">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Sri Lanka Institute of Information Technology
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Bachelor's
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-end">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Software Engineering
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          April 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-dashed bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease cursor-pointer">
                    <GrAdd className="text-3xl font-gray-200 text-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Professional Experience
              </h1>
              <div className="grid gap-3">
                <div className="">
                  <div className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-solid bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease">
                    {/* Current or Previous Employer
                        Job Title
                        Years of Experience
                        Relevant Work Experience
                        Job Description */}
                    <div className="flex flex-row justify-between items-center w-[90%] h-[80px]">
                      <div className="flex flex-col justify-center items-start">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Employer
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Job Title
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-end">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Years of Experience
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Job Description
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-dashed bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease cursor-pointer">
                    <GrAdd className="text-3xl font-gray-200 text-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Certifications
              </h1>
              <div className="grid grid-cols-3 gap-3">
                <div className="">
                  <div className="w-[100%] h-[250px] flex flex-col justify-center items-center border-2 border-solid bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease"></div>
                </div>
                <div className="">
                  <div className="w-[100%] h-[250px] flex flex-col justify-center items-center border-2 border-dashed bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease cursor-pointer">
                    <GrAdd className="text-3xl font-gray-200 text-gray-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 items-center flex flex-col justify-center py-5 gap-5">
              <button
                type="submit"
                className="col-span-2 mt-4 text-white bg-[#ef86c1] hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
        </div>
      </section>
    </div>
  );
}

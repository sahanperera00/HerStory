import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { Button } from "../../components";
import axios from "axios";
import validator from "validator";
import AddQualifications from "../../components/Modal/AddQualifications";
import AddExperience from "../../components/Modal/AddExperience";
import { MdOutlineCancel } from "react-icons/md";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ConsultantSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [category, setCategory] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const filepickerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8070/user/register", {
        firstName,
        lastName,
        role: "counsellor",
        email,
        password,
      })
      .then(async (res) => {
        console.log("User registered successfully");
        const urls = await uploadFiles();
        console.log("Images uploaded successfully");

        await axios
          .post("http://localhost:8070/counsellor", {
            user: { _id: res.data.user._id },
            dob,
            phoneNumber: phone,
            gender,
            nationality,
            category,
            education,
            experience,
            certifications: urls,
          })
          .then(() => {
            console.log("Counsellor registered successfully");
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImages = async (e) => {
    const fileList = e.target.files;
    const array = [];

    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      reader.onload = () => {
        array.push(reader.result);

        if (array.length === fileList.length) {
          setImages([...images, ...array]);
        }
      };
    }
    const imagesArray = Array.from(fileList);
    setCertifications([...certifications, ...imagesArray]);
  };

  const uploadFiles = async () => {
    const uploadPromises = certifications.map(async (image) => {
      const storageRef = ref(storage, `${email}/certificates/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(ref(storageRef));
        return url;
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  };

  const handleAddQualifications = (university, type, field, graduated) => {
    setEducation([
      ...education,
      {
        university,
        type,
        field,
        graduated,
      },
    ]);
  };

  const handleAddExperience = (employer, title, duration, description) => {
    setExperience([
      ...experience,
      {
        employer,
        title,
        duration,
        description,
      },
    ]);
  };

  const handleDeleteQualifications = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const handleDeleteExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
  };

  const handleDeleteCertifications = (index) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    setCertifications(newCertifications);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="signup py-[50px] bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
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
        <form onSubmit={handleSubmit}>
          <div className="container p-10 grid grid-cols-2 bg-[#f9e9e9] flex rounded-lg shadow-lg dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your Account
              </h1>

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
                          if (validator.isEmail(e.target.value)) {
                            setEmail(e.target.value);
                          } else {
                            setEmail("");
                          }
                        }}
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
                        type="Number"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Eg:- 071XXXXXXX"
                        required="required"
                        onChange={(e) => {
                          setPhone(e.target.value);
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
                        type="Date"
                        name="dob"
                        id="dob"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required="required"
                        onChange={(e) => {
                          setDob(e.target.value);
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
                          setGender(e.target.value);
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
                          setNationality(e.target.value);
                        }}
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
                        name="category"
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required="required"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {/* <option value="legalConsultation">
                          Legal consultation
                        </option>
                        <option value="counselingAndTherapy">
                          Counseling and therapy
                        </option>
                        <option value="selfDefenseAndSafetyTraining">
                          Self-defense and safety training
                        </option>
                        <option value="workplaceHarassmentConsultation">
                          Workplace harassment consultation
                        </option>
                        <option value="safetyPlanningAndSupport">
                          Safety planning and support
                        </option> */}
                        {categories.map((category) => (
                          <option value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex flex-row gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="........"
                        required="required"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Educational Background
              </h1>

              <AddQualifications
                isModalOpen1={isModalOpen1}
                setIsModalOpen1={setIsModalOpen1}
                handleAddQualifications={handleAddQualifications}
              />

              <div className="grid gap-3">
                {education &&
                  education.length > 0 &&
                  education.map((item, index) => (
                    <div className="relative">
                      <MdOutlineCancel
                        className="absolute right-1 top-1 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200 ease-in-out"
                        onClick={() => {
                          handleDeleteQualifications(index);
                        }}
                      />
                      <div className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-solid bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease">
                        <div className="flex flex-row justify-between items-center w-[90%] h-[80px]">
                          <div className="flex flex-col justify-center items-start">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.university}
                            </p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {item.type}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center items-end">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {item.field}
                            </p>
                            <p className="text-xsbreak-all font-medium text-gray-500 dark:text-gray-400">
                              {item.graduated}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="">
                  <div
                    onClick={showModal1}
                    className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-dashed bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease cursor-pointer"
                  >
                    <GrAdd className="text-3xl font-gray-200 text-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Professional Experience
              </h1>

              <AddExperience
                isModalOpen2={isModalOpen2}
                setIsModalOpen2={setIsModalOpen2}
                handleAddExperience={handleAddExperience}
              />

              <div className="">
                <div className="grid gap-3 grid-cols-1">
                  {experience &&
                    experience.length > 0 &&
                    experience.map((item, index) => (
                      <div className="relative">
                        <MdOutlineCancel
                          className="absolute right-1 top-1 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200 ease-in-out"
                          onClick={() => {
                            handleDeleteExperience(index);
                          }}
                        />
                        <div className="w-[100%] flex flex-col justify-center items-center border-2 border-solid bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease">
                          <div className="flex flex-col justify-between items-center w-[90%] py-3">
                            <div className="flex w-full justify-between">
                              <div className="flex flex-col justify-center items-start">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.employer}
                                </p>
                              </div>
                              <div className="flex flex-col justify-center items-end">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                  {item.title}
                                </p>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                  {item.duration} Years
                                </p>
                              </div>
                            </div>
                            <p className="text-xs py-2 w-full font-medium text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                  <div className="">
                    <div
                      onClick={showModal2}
                      className="w-[100%] h-[80px] flex flex-col justify-center items-center border-2 border-dashed bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease cursor-pointer"
                    >
                      <GrAdd className="text-3xl font-gray-200 text-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Certifications
              </h1>
              <div className="grid grid-cols-3 gap-3">
                {images && images.length > 0 ? (
                  images.map((item, index) => (
                    <div className="relative">
                      <MdOutlineCancel
                        className="absolute right-1 top-1 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200 ease-in-out"
                        onClick={() => {
                          handleDeleteCertifications(index);
                        }}
                      />
                      <img src={item} className="w-[100%] rounded-lg" />
                    </div>
                  ))
                ) : (
                  <></>
                )}
                <div className="">
                  <div
                    onClick={() => filepickerRef.current.click()}
                    className="w-[100%] h-[250px] flex flex-col justify-center items-center border-2 border-dashed bg-white dark:bg-secondary-dark-bg rounded-lg hover:border-gray-500 transition duration-200 ease cursor-pointer"
                  >
                    <GrAdd className="text-3xl font-gray-200 text-gray-100" />
                  </div>
                  <input
                    type="file"
                    ref={filepickerRef}
                    onChange={uploadImages}
                    multiple
                    hidden
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 items-center flex flex-col justify-center py-5 gap-5">
              <button type="submit">Create Account</button>
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
  );
}

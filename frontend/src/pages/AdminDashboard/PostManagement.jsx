import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, ThemeSettings } from "../../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import AdminSidebar from "./AdminSidebar";
import { Header, TableHeader, TableData } from "../../components";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdPreview } from "react-icons/md";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";

export default function ForumManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const toDateRange = () => {
    navigate("/admin/PostDateRange", { state: { DS: dateStart, DE: dateEnd } });
  };
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getPosts = async () => {
      await axios
        .get("http://localhost:8070/posts", header)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, []);

  const header = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const confirmFunc = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "#f8f9fa",
      background: "#6c757d",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:8070/posts/${postId}`,
          header
        );
        if (res.status === 200) {
          setPosts(posts.filter((p) => p._id !== postId));
        }
        Swal.fire({
          icon: "success",
          title: "Post Successfully Deleted",
          color: "#f8f9fa",
          background: "#6c757d",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        navigate("/admin/manage-post");
      }
    });
  };

  const confirmFunc1 = async () => {
    Swal.fire({
      title: "Are you sure you want to remove all the posts?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "#f8f9fa",
      background: "#6c757d",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:8070/posts/`, header);
        if (res.status === 200) {
          setPosts(posts.filter((p) => p._id !== postId));
        }
        Swal.fire({
          icon: "success",
          title: "Posts Successfully Deleted",
          color: "#f8f9fa",
          background: "#6c757d",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        navigate("/admin/manage-post");
      }
    });
  };

  let dateRangeRef = (dateRange) => {
    dateRangeRef = dateRange; // dateRangeRef is a reference to the DateRangePickerComponent
  };

  const filterDate = () => {
    if (dateRangeRef.value && dateRangeRef.value.length > 0) {
      const start = dateRangeRef.value[0];
      const end = dateRangeRef.value[1];

      setDateStart(start);
      setDateEnd(end);
      navigate("/admin/PostDateRange", { state: { DS: start, DE: end } });
    } else {
      alert("Please select a date range");
      console.log(dateRangeRef.value);

      setDateStart("");
      setDateEnd("");
    }
  };

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            {/* THEME SETTINGS BUTTON */}
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* SIDEBAR IMPLEMENTATION */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-[#f9e9e9]">
              <AdminSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <AdminSidebar />
            </div>
          )}

          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg min-h-screen md:ml-72 w-full  "
                : " dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div className="md:m-6 p-5">
                <Header title="Forum Posts Management" />

                <br></br>
                <div className=" flex items-center mb-5 ">
                  {" "}
                  <div className=" bg-slate-100 pt-1 rounded-lg px-5 w-56">
                    <DateRangePickerComponent
                      ref={dateRangeRef}
                      placeholder="Select a date range"
                    />
                  </div>
                  <div className="ml-5">
                    <button
                      type="button"
                      className="py-2 px-4 rounded-lg text-white bg-pink-400"
                      onClick={() => filterDate()}
                    >
                      Filter
                    </button>
                  </div>
                  <div className="ml-5">
                    <button
                      type="button"
                      className="py-2 px-4 rounded-lg text-white bg-pink-400"
                      onClick={() => confirmFunc1()}
                    >
                      Remove all
                    </button>
                  </div>
                  <div className=" mr-0 ml-auto">
                    <div class="pt-2 relative mx-auto text-gray-600">
                      <input
                        class="border-2 border-gray-300 bg-slate-100 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search here"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        class="absolute right-0 top-0 mt-5 mr-4"
                      >
                        <svg
                          class="text-pink-600 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 56.966 56.966"
                          //style="enable-background:new 0 0 56.966 56.966;"
                          xml:space="preserve"
                          width="512px"
                          height="512px"
                        >
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto rounded-lg">
                  <table className="w-full rounded-lg dark:text-white">
                    <thead>
                      <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                        <TableHeader value="Post ID" />
                        <TableHeader value="Title" />
                        <TableHeader value="User Email" />
                        <TableHeader value="Date" />
                        <TableHeader value="Action" />
                      </tr>
                    </thead>
                    <tbody>
                      {posts &&
                        posts
                          .filter((data) => {
                            if (searchTerm == "") {
                              return data;
                            } else if (
                              data.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              data.postedBy.email
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .map((data, index) => {
                            let datacolor = "text-green-500 font-bold";
                            if (
                              data.title.toLowerCase().includes("gun") ||
                              data.title.toLowerCase().includes("knife") ||
                              data.title.toLowerCase().includes("bomb") ||
                              data.title.toLowerCase().includes("fight")
                            ) {
                              datacolor = "text-red-600 font-bold";
                            }
                            return (
                              <tr
                                key={data._id}
                                className="bg-white  hover:bg-[#fcfcfc] border-b-2 border-gray-200 dark:bg-slate-800"
                              >
                                <TableData value={index + 1} />
                                <td
                                  className={`${datacolor}  px-3  border-l-0 border-r-0 text-m whitespace-nowrap p-3`}
                                >
                                  {data.title}{" "}
                                </td>
                                <TableData value={data.postedBy.email} />
                                <TableData
                                  value={
                                    data.dateCreated
                                      ? data.dateCreated
                                          .toString()
                                          .split("T")[0]
                                      : ""
                                  }
                                />
                                <TableData
                                  value={
                                    <div className="flex gap-4">
                                      <button
                                        onClick={() =>
                                          navigate(`/post/${data._id}`)
                                        }
                                        className="text-white bg-[#f4c723] p-2 rounded-full hover:bg-[#f4c723]"
                                        title="View"
                                      >
                                        <MdPreview />
                                      </button>

                                      <button
                                        onClick={() => confirmFunc(data._id)}
                                        className="text-white bg-[#fb6962] p-2 rounded-full hover:bg-[#fb6962]"
                                        title="Remove"
                                      >
                                        <RiDeleteBin2Line />
                                      </button>
                                    </div>
                                  }
                                />
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./SearchBar.css";
import { UilSearch } from "@iconscout/react-unicons";
import axios from "axios";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="w-full">
      <div className="searchBar bg-white">
        <input
          type="text"
          className="focus:outline-none focus:ring-0"
          placeholder="Type here to search ..."
          onChange={(e) => setSearchTerm(e.target.value)} //Setting the onChange value to the setSearchTerm
          style={{
            outline: "none",
          }}
        />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>{" "}
      <div
        className="h-[700px] overflow-scroll w-[40%] mt-20"
        style={{ position: "absolute", top: 0 }}
        hidden={searchTerm === "" ? true : false}
      >
        {posts
          .filter((val) => {
            //Filtering the items
            if (searchTerm === "") {
              return "";
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((data, key) => {
            return (
              <div className="w-full rounded-lg shadow-xl" key={key}>
                <a
                  href={`/pr/${data._id}`}
                  class=" px-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img class=" w-[65px]" src={data.image} alt="" />
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">
                      {data.title}
                    </h5>
                    <p class="text-sm text-gray-700 dark:text-gray-400">
                      {data.description}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

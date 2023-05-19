import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Communities = () => {
  const [community, setcommunity] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8070/community/");
      const data = await response.json();
      const reversedData = data.reverse();
      setcommunity(reversedData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const joinCommunity = (communityId) => {
    setJoinedCommunities((prevJoinedCommunities) => [
      ...prevJoinedCommunities,
      communityId,
    ]);

    Swal.fire({
      icon: "success",
      title: "You have Joined Successfully",
      color: "#f8f9fa",
      background: "#6c757d",
      showConfirmButton: false,
      timer: 2000,
    });

    navigate(`/forumSurvivor`);
  };

  return (
    <>
      <div className="flex flex-col w-[87%]">
        <div className="flex flex-row justify-start my-[20px] min-[400px]:ml-[12%] md:ml-[5%] lg:ml-[6%] xl:ml-[4%]  h-fit items-center">
          <h1 className="font-[600] text-[24px]">Suggested for You</h1>
        </div>

        <div className="grid xl:grid-cols-3 sm:grids-cols-1 md:grid-cols-2 min-[2000px]:grid-cols-4 place-items-center">
          {community.map((data) => (
            <div className="w-[75%] pt-5 h-fit rounded-[15px] overflow-hidden shadow-[0px_7px_5px_rgba(0,0,0,0.25)] my-[35px] bg-[#f9e9e9]">
              <div className="px-[15px] mx-[15px] pt-[5px] pb-[35px] flex flex-col items-center">
                <div className=" w-fit h-fit ">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"
                    alt="profile"
                    className="rounded-[15px] max-w-[10vw] max-h-[10vw] mb-[20px]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className=" mx-[22px] mt-[5px] flex flex-row justify-center">
                    <text className="font-[600] text-[20px]">{data.name}</text>
                  </div>

                  <div className="h-fit font-[500] text-base text-[#777777] text-[14px] text-center my-[5px]">
                    {data.description}
                  </div>
                  {/* <div className="h-fit font-[500] text-base text-[#fc46aa] text-[16px] text-center ">
                    {data.Members} members
                  </div> */}
                  <div className=" flex flex-1 items-center justify-center">
                    {joinedCommunities.includes(data._id) ? (
                      <button className="inline-block bg-gray-400  h-[40px] w-[145px] rounded-[7px] px-3 py-1 text-[20px] font-medium bottom-[0px] text-[#FFFFFF] mt-[35px]">
                        Joined
                      </button>
                    ) : (
                      <button
                        className="inline-block bg-pink-300  h-[40px] w-[145px] rounded-[7px] px-3 py-1 text-[20px] font-medium bottom-[0px] text-[#FFFFFF] mt-[35px] "
                        onClick={() => joinCommunity(data._id)}
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center mt-[-20px] mb-[25px] min-[400px]:ml-[12%] md:ml-[5%] h-fit items-center"></div>
      </div>
    </>
  );
};

export default Communities;

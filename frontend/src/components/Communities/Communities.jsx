import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Community from "./community";
import { BsArrowRightShort } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

// const community = [
//   {
//     id: 1,
//     title: "Survivor Support Community",
//     desc: " A space for survivors of harassment or assault to share their stories, and offer support to each other",
//     members: "8 members",
//   },
//   {
//     id: 2,
//     title: "Legal Advice and Resources Community",
//     desc: "Providing legal resources and advice and distributing information on the legal processes",
//     members: "10 members",
//   },
//   {
//     id: 3,
//     title: "Mental Health and Wellness Community",
//     desc: "Focus on providing resources and support for women who are struggling with the mental health effects",
//     members: "50 members",
//   },
//   {
//     id: 4,
//     title: "Workplace Harassment Community",
//     desc: "Providing resources and support for women who have experienced harassment or assault in the workplace",
//     members: "20 members",
//   },
//   {
//     id: 5,
//     title: "Education and Prevention Community",
//     desc: "Educating and raising awareness about harassment and assault and providing resources and strategies for prevention",
//     members: "30 members",
//   },
// ];

const Communities = () => {
  const [community, setcommunity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                  <div className="h-fit font-[500] text-base text-[#fc46aa] text-[16px] text-center ">
                    {data.Members} members
                  </div>
                  <div className=" flex flex-1 items-center justify-center">
                    <button className="inline-block bg-pink-300  h-[40px] w-[145px] rounded-[7px] px-3 py-1 text-[20px] font-medium bottom-[0px] text-[#FFFFFF] mt-[35px] ">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center mt-[-20px] mb-[25px] min-[400px]:ml-[12%] md:ml-[5%] h-fit items-center">
          <h1 className="font-[500] text-[20px] text-[#777777]">View More</h1>
          <BsChevronDown className="text-[28px] text-[#777777] font-[600] mx-[10px] " />
        </div>
      </div>
    </>
  );
};

export default Communities;

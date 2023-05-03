import React from "react";
// import Community from "./community";
import { BsArrowRightShort } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

const Communities = () => {
  return (
    <>
      <div className="flex flex-col w-[87%]  ">
        <div className="flex flex-row justify-start my-[20px] min-[400px]:ml-[12%] md:ml-[5%] lg:ml-[6%] xl:ml-[4%]  h-fit items-center">
          <h1 className="font-[600] text-[24px] font-['poppins']">
            Suggested for You
          </h1>
        </div>
        <div className="grid xl:grid-cols-3 sm:grids-cols-1 md:grid-cols-2 min-[2000px]:grid-cols-4 place-items-center">
          <div className="w-[75%]  h-fit rounded-[15px] font-['Poppins'] overflow-hidden shadow-[0px_7px_5px_rgba(0,0,0,0.25)] my-[35px]">
            <div className="px-[15px] mx-[15px] pt-[5px] pb-[35px] flex flex-col items-center">
              <div className=" w-fit h-fit ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"
                  alt="profile"
                  className="rounded-[15px] max-w-[10vw] max-h-[10vw] mb-[20px]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className=" mx-[22px] mt-[5px] flex flex-row justify-center mt-[10px]">
                  <text className="font-[600] text-[20px]">Web Developers</text>
                </div>

                <div className="h-fit font-[500] text-base text-[#777777] text-[14px] text-center my-[5px]">
                  Join this awesome community of Web Developers and learn!!
                </div>
                <div className="h-fit font-[500] text-base text-[#fc46aa] text-[16px] text-center ">
                  120 Members
                </div>
                <div className=" flex flex-1 items-center justify-center">
                  <button className="inline-block bg-pink-300  h-[40px] w-[145px] rounded-[7px] px-3 py-1 text-[20px] font-medium bottom-[0px] text-[#FFFFFF] mt-[35px] ">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-[-20px] mb-[25px] min-[400px]:ml-[12%] md:ml-[5%] h-fit items-center">
          <h1 className="font-[500] text-[20px] text-[#777777] font-['poppins']">
            View More
          </h1>
          <BsChevronDown className="text-[28px] text-[#777777] font-[600] mx-[10px] " />
        </div>
      </div>
    </>
  );
};

export default Communities;

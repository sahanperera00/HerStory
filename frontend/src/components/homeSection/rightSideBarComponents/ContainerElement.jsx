import React from "react";

const coms = [
  {
    id: 1,
    title: "Survivor Support ",
    no: "5 posts",
  },
  {
    id: 2,
    title: "Legal Advice and Resources",
    no: "4 posts",
  },
  {
    id: 3,
    title: "Mental Health and Wellness",
    no: "8 posts",
  },
  {
    id: 4,
    title: "Education and Prevention",
    no: "2 posts",
  },
  {
    id: 5,
    title: "Workplace Harassment",
    no: "2 posts",
  },
];

const ContainerElement = () => {
  return (
    <>
      {coms.map((data) => (
        <div className="relative h-[60px]  p-2 pr-0 my-4">
          <div className=" ml-4 bg-[#f2b8c6] inline-block h-full w-[44px]  mr-2 rounded-lg"></div>

          <div className="inline-block h-full align-top ml-4">
            <div className="h-[50%] text-md font-normal font-sans">
              {data.title}
            </div>
            <div className="h-[50%] text-sm font-normal font-sans text-[#777777]">
              {data.no}
            </div>
          </div>

          <div className="cursor-pointer text-[#ea76b8] hover:drop-shadow-[0_0_10px_#05CFB3]  inline-block h-[calc(100%-16px)] w-[48px] absolute pt-2 right-2  text-center  ">
            View
          </div>
        </div>
      ))}
    </>
  );
};

export default ContainerElement;

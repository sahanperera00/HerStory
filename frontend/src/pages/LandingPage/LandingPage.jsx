import React from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import wave from "../../assets/wave.png";
import girl from "../../assets/girl.png";

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-screen w-screen relative bg-gradient-to-t from-[#ccb1b1] to-[#ffdede]">
      <img
        src={girl}
        alt="girl"
        className="w-[40%] absolute bottom-[100px] left-[100px] z-1]"
      />
      <img src={wave} alt="wave" className="w-[100%] absolute bottom-0 z-2" />

      <div className="w-[38%] absolute top-[16%] right-[15%] z-1 flex flex-col items-center gap-[10px]">
        <p className="text-[#00000055]">
          Powered by <span className="text-[#000000b5]">Code Crusaders</span>
        </p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/herstory-6a3c0.appspot.com/o/logo-no-background.png?alt=media&token=08cba1bc-5127-4a4a-8ea6-75cf010b01b1"
          alt="logo"
          className=" mb-10"
        />
        <div className="flex gap-5 text-[#353530] font-caveat text-center mb-7">
          <p className="text-[24px]">
            Your{" "}
            <span className="text-[28px] text-[#ef86c1] uppercase">Voice</span>
          </p>
          <p className="text-[24px]">
            Your{" "}
            <span className="text-[28px] text-[#ef86c1] uppercase">Story</span>
          </p>
          <p className="text-[24px]">
            Your{" "}
            <span className="text-[28px] text-[#ef86c1] uppercase">Safety</span>
          </p>
        </div>
        <p className="w-[65%] text-center text-[#353530] font-caveat text-[25px] mb-10">
          We believe that every woman has the strength within her to overcome
          trauma and heal from the past.
        </p>
        <div className="flex gap-9">
          <Link to={"/login"}>
            <Button
              text={"Login"}
              bgColor={"#ef86c1"}
              borderRadius={"10px"}
              color={"white"}
              width={220}
            />
          </Link>
        </div>
      </div>

      {/* footer */}
      <div className="absolute bottom-0 flex w-[100%] justify-center py-5 ">
        <p className="text-[18px] text-gray-600">
          © {currentYear} HerStory Services. All rights reserved.
        </p>
      </div>
    </div>
  );
}

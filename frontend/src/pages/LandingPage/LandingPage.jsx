import React from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Button
        text={"Login"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
      />
      <Button
        text={"Register"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
      />
      <Button
        text={"Client Dashboard"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
      />
      <Button
        text={"Counsellor Dashboard"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
      />
      <Link to={"/admin"}>
        <Button
          text={"Admin Dashboard"}
          bgColor={"#ef86c1"}
          borderRadius={"10px"}
          color={"white"}
        />
      </Link>
    </div>
  );
}

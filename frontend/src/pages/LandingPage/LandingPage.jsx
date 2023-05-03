import React from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to={"/login"}>
      <Button
        text={"Login"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
        />
        </Link>
      <Link to={"/consultant-signup"}>
      <Button
        text={"Register as a Consultant"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
        />
        </Link>

        <Link to={"/client-signup"}>
      <Button
        text={"Register as a Client"}
        bgColor={"#ef86c1"}
        borderRadius={"10px"}
        color={"white"}
        />
        </Link>

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

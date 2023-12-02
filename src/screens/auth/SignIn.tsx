import { SignInBody } from "@/components";
import React from "react";
import { AuthHeader } from "../shared";
import accessLogo from "../../../public/accessLogo.png";

type Props = {};

const SignIn = (props: Props) => {
  const createFormStyle = {
    maxWidth: "400px", 
    margin: "100px auto", 
    marginTop: "250px",
    padding: "20px", 
    boxShadow: "0 0 10px black",
    backgroundColor: "white",
  
  };

  const logoStyle = {
    width: "60px", 
    height: "50px",
    marginBottom: "2px", 
  };

  const logoUrl = accessLogo.src;
  
  return (
    <div className="flex items-center justify-center  flex-col max-w-md m-auto " style={createFormStyle}>
      <img src={logoUrl} alt="Your Logo" style={logoStyle} />
      <AuthHeader
        title="Retail FX"
        
        subTitle=""
      />
      <SignInBody />
      <p className="bottom-3 text-gray-300 text-sm italic mt-4 mb-5">
        A product of
        <span className=" text-blue-500 text-sm"> Aristack</span>
      </p>
    </div>
  );
};

export default SignIn;

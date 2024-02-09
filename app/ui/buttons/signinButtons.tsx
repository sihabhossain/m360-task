import React from "react";
import googleIcon from "../../../public/google.png";
import appleIcon from "../../../public/apple.png";
import Image from "next/image";

const SigninButtons: React.FC = () => {
  return (
    <div>
      <div>
        <button className="btn bg-[#F0F5FA] rounded-2xl mr-5">
          <div>
            <Image src={googleIcon} alt="google"></Image>
          </div>
          <div>
            <h2 className="text-[#8A94A6]">Sign In with Google</h2>
          </div>
        </button>
        <button className="btn bg-[#F0F5FA] rounded-2xl">
          <div>
            <Image src={appleIcon} alt="google"></Image>
          </div>
          <div>
            <h2 className="text-[#8A94A6]">Sign In with Apple ID</h2>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SigninButtons;

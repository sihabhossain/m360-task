import React from "react";
import SigninButtons from "../../buttons/signinButtons";
import or from "../../../../public/or.png";
import Image from "next/image";
import FormInput from "../form/SigninFormInput";
import SignupFormInput from "../form/SignupFormInput";

const SignupForm: React.FC = () => {
  return (
    <div className="mt-24 w-full  text-center">
      <div>
        <h2 className="font-semibold text-3xl">Getting Started</h2>
        <p className="text-[#8A94A6] pt-2">Create an account to continue!</p>
      </div>

      {/* Sign in buttons */}
      <div className="py-7">
        <SigninButtons></SigninButtons>
      </div>

      {/* or */}

      <div className="text-center flex justify-center items-center">
        <Image src={or} alt="or" width={400}></Image>
      </div>

      <div className="flex justify-center items-center text-[#8A94A6] ">
        <SignupFormInput></SignupFormInput>
      </div>
    </div>
  );
};

export default SignupForm;

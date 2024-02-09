import React from "react";
import SigninButtons from "../../buttons/signinButtons";
import or from "../../../../public/or.png";
import Image from "next/image";
import FormInput from "../form/SigninFormInput";

const SigninForm: React.FC = () => {
  return (
    <div className="mt-24 w-full  text-center">
      <div>
        <h2 className="font-semibold text-3xl">Sign In</h2>
        <p className="text-[#8A94A6] pt-2">Welcome back, you’ve been missed!</p>
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
        <FormInput></FormInput>
      </div>
    </div>
  );
};

export default SigninForm;

import React from "react";
import Header from "../ui/login/header/Header";
import SignupForm from "../ui/login/signupForm/SignupForm";

const SignUpPage = () => {
  return (
    <div className="p-10">
      {/* Header */}
      <div>
        <Header></Header>
      </div>

      <div>
        <SignupForm></SignupForm>
      </div>
    </div>
  );
};

export default SignUpPage;

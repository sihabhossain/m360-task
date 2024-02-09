import React from "react";
import Header from "../ui/login/header/Header";
import SigninForm from "../ui/login/signinForm/SigninForm";

const LoginPage = () => {
  return (
    <div className="p-10">
      {/* Header */}
      <div>
        <Header></Header>
      </div>

      <div>
        <SigninForm></SigninForm>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import React, { useState } from "react";
import "./index.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import Link from "next/link";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/redux/authSlice";
import { AppDispatch } from "@/app/redux/store";
import toast, { Toaster } from "react-hot-toast";

const SignupFormInput: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    const name = values.name;
    const email = values.email;
    const password = values.password;

    try {
      const action = await dispatch(signUpUser({ name, email, password }));

      if (signUpUser.fulfilled.match(action)) {
        const { error, msg, token } = action.payload;

        if (error) {
          toast.error(error);
        } else {
          toast.success(msg);
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Display error toast for unexpected errors
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // Password strength meter
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <Form
      name="normal_login"
      className="login-form "
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter a valid email address!" },
        ]}
      >
        <Input
          prefix={"@"}
          placeholder="Your Email"
          style={{ padding: "10px" }}
          className="rounded-xl text-[#8A94A6]"
        />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={
            <UserOutlined className="site-form-item-icon text-[#8A94A6]" />
          }
          placeholder="Your name"
          style={{ padding: "10px" }}
          className="rounded-xl"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter a valid password!" }]}
      >
        <Input.Password
          prefix={
            <LockOutlined className="site-form-item-icon text-[#8A94A6]" />
          }
          type="password"
          placeholder="Create Password"
          style={{ padding: "10px" }}
          className="rounded-xl"
          onChange={handlePasswordChange}
        />
      </Form.Item>

      {/* Password strength bar */}
      <Form.Item>
        <PasswordStrengthBar password={password} />
      </Form.Item>

      <Form.Item className="text-left">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="text-[#8A94A6]">
            I agree to the Terms & Conditions
          </Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <button className="w-full py-3 rounded-xl bg-[#377DFF] text-white hover:bg-blue-700 active:bg-blue-800 duration-1000 transition">
          Sign Up
        </button>
        <div className="text-[#8A94A6] mt-2">
          Already have an account?{" "}
          <Link href={"/signin"} className="text-blue-500 font-semibold">
            Sign In
          </Link>
        </div>
      </Form.Item>

      <Toaster />
    </Form>
  );
};

export default SignupFormInput;

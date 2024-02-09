"use client";

import React from "react";
import "./index.css";
import { LockOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { AppDispatch } from "@/app/redux/store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInUser } from "@/app/redux/authSlice";

const SignupFormInput: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    const email = values.email;
    const password = values.password;

    try {
      const action = await dispatch(signInUser({ email, password }));

      if (signInUser.fulfilled.match(action)) {
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
        name="password"
        rules={[
          { required: true, message: "Please enter a valid email password!" },
        ]}
      >
        <Input.Password
          prefix={
            <LockOutlined className="site-form-item-icon text-[#8A94A6]" />
          }
          type="password"
          placeholder="Password"
          style={{ padding: "10px" }}
          className="rounded-xl"
        />
      </Form.Item>
      <Form.Item className="text-left">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="text-[#8A94A6]">Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <button className="w-full py-3 rounded-xl bg-[#377DFF] text-white hover:bg-blue-700 active:bg-blue-800 duration-1000 transition">
          Sign In
        </button>
        <div className="text-[#8A94A6] mt-2">
          Don’t have an account yet?{" "}
          <Link href={"/signup"} className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </div>
      </Form.Item>
      <Toaster />
    </Form>
  );
};

export default SignupFormInput;

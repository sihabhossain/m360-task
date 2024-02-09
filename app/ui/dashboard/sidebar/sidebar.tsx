import Image from "next/image";
import React from "react";
import logo from "../../../../public/logo.png";
import { RxDashboard } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import MenuLink from "./menuLink/menuLink";

const Sidebar: React.FC = () => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <RxDashboard></RxDashboard>,
    },
    {
      title: "Users",
      path: "/dashboard/users",
      icon: <CiUser></CiUser>,
    },
  ];

  return (
    <div>
      <div>
        <Image src={logo} alt="logo"></Image>
      </div>

      <h2 className="mt-10 text-[#A7AFBC]">PAGES</h2>

      {/* Sidebar items */}
      <div>
        {menuItems.map((item, index) => (
          <MenuLink item={item} key={index}></MenuLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

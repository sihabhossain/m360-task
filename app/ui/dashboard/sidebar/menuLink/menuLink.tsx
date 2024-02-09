"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface menuLinkProps {
  item: any;
}

const MenuLink: React.FC<menuLinkProps> = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link href={item.path}>
      <div
        className={`flex items-center gap-2 mt-5 hover:bg-[#F0F5FA] py-3 px-2 rounded-2xl ${
          pathName === item.path && "bg-[#F0F5FA] py-3 px-2 rounded-2xl"
        }`}
      >
        <div className="text-[#A7AFBC] text-[25px]">{item.icon}</div>
        <ul className="text-[#A7AFBC] text-[20px]">{item.title}</ul>
      </div>
    </Link>
  );
};

export default MenuLink;

import React, { ReactNode } from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex gap-6">
      <div className="w-[15%] p-10 border-r-2 border-[#F3F3F3] h-screen">
        <Sidebar></Sidebar>
      </div>

      <div className="w-[85%] p-10">
        <div className="mb-10">
          <Navbar></Navbar>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import user from "../../../../public/user.png";
import notify from "../../../../public/notify.png";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className=" flex items-center justify-between ">
      <div>
        <div className="flex justify-between items-center">
          {/* Search */}
          <div className="relative">
            <input
              className="w-[300px] md:w-[600px] outline-none rounded-2xl py-3 px-4 appearance-none border-none text-[#A7AFBC] bg-[#F0F5FA]"
              type="search"
              placeholder="search"
            />

            <div className="absolute top-3 right-4 text-[20px] text-[#A7AFBC]">
              <CiSearch></CiSearch>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10 space-x-3">
        {/* Icon */}
        <div>
          <div className="dropdown">
            <div tabIndex={0} className="mt-1">
              <Image src={notify} alt="notify" width={30} height={10}></Image>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box "
            >
              <li>
                <a>1</a>
              </li>
              <li>
                <a>2</a>
              </li>
            </ul>
          </div>
        </div>

        {/* user */}

        <div className="dropdown">
          <div tabIndex={0}>
            <div className="flex items-center bg-white py-1 px-2 cursor-pointer rounded-md">
              <div>
                <Image src={user} alt="notify" width={60} height={40}></Image>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <a>Settings</a>
            </li>
            <li>
              <p className="text-orange-700 ">
                <Link href={"/signin"}>Logout</Link>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

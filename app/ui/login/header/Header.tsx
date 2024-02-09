import React from "react";
import logo from "../../../../public/logo.png";
import Image from "next/image";

// icon
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Image src={logo} alt="logo"></Image>
      </div>

      <div>
        <div>
          <div>
            <div className="dropdown">
              <div tabIndex={0}>
                <button className="btn bg-[#F0F5FA] rounded-2xl">
                  <div>
                    <h2>English (uk)</h2>
                  </div>
                  <div>
                    <IoIosArrowDown></IoIosArrowDown>
                  </div>
                </button>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box "
              >
                <li>
                  <a>Bangla</a>
                </li>
                <li>
                  <a>Hindi</a>
                </li>
                <li>
                  <a>Spanish</a>
                </li>
                <li>
                  <a>Chinese</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

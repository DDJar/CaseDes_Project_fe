import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import Button from "../Button";
import { logout } from "../../service/loginService";
import { MenuLinks, DropdownLinks } from "../../constants/href";
import { getUserById } from "../../service/UserService";
import { GetListProductOnCard } from "../../service/CartService";
function NavBar() {
  const [userInfor, setuserInfor] = useState("");
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      const userData = await getUserById(userId);
      setuserInfor(userData);
      const cartRes = await GetListProductOnCard();
      const filteredResponse = cartRes.filter(
        (item) => item.userId === userId && item.status === "unpaid"
      );
      setCartData(filteredResponse);
    }
  };
  const handleLogout = () => {
    logout();
    setuserInfor("");
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200  z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            <Button
              to="/"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              CASEDES
            </Button>

            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
                {userInfor &&
                  userInfor.role &&
                  userInfor.role.some((role) => role.roleName === "ADMIN") && (
                    <div>
                      <li>
                        <a
                          href={"/admin/user"}
                          className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                        >
                          Admin Page
                        </a>
                      </li>
                    </div>
                  )}

                {/* Dropdown  */}
                <li className="relative cursor-pointer group">
                  <a
                    href={"/"}
                    className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300"></FaCaretDown>
                    </span>
                  </a>
                  {/* Dropdown Links */}
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white ">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data, index) => (
                        <li key={index}>
                          <a
                            className="text-gray-500  dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar section */}
            <div className="relative group hidden sm:block">
              <input type="text" placeholder="Search" className="search-bar" />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>

            {/* Order-button section */}
            {userInfor && (
              <button className="relative p-3">
                <a href="/carts">
                  <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                  <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                    {cartData.length}
                  </div>
                </a>
              </button>
            )}
            {/* Dark Mode section */}
            <div>
              <DarkMode />
            </div>
            {!userInfor && (
              <div className="flex">
                <div>
                  <Button
                    primary
                    to={"/login"}
                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <Button
                    outline
                    to={"/register"}
                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                  >
                    Regist
                  </Button>
                </div>
              </div>
            )}
            {userInfor && (
              <div className="navbar-nav font-weight-bold py-0 flex mr-2">
                {userInfor && (
                  <button className="mr-4">
                    <a href="/user">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={`https://case-shop-be.onrender.com/imageUpload/${userInfor.imgAvt}`}
                        alt="User Avatar"
                      />
                    </a>
                  </button>
                )}
                <Button
                  onClick={handleLogout}
                  leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                  outline
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

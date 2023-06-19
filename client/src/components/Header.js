import React from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";

const Header = () => {
    return (
        <div className="">
            <div className="bg-main h-[36px]">
                <div className="w-main leading-[36px] flex m-auto items-center justify-between">
                    <ul className="text-[12px] text-[#fff] font-[400] flex items-center">
                        <li>
                            <span className="">
                                ORDER ONLINE OR CALL US (+1800) 000 8808
                            </span>
                            <span className="border-[1px] border-[#eee] mx-[15px]"></span>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <icons.FaMoneyBillAlt className="" />
                                <span className="">VND</span>
                                <icons.BiChevronDown className="" />
                            </div>
                        </li>
                    </ul>
                    <ul className="text-[12px] text-[#fff] font-[400] flex items-center">
                        <li>
                            <span className="">Sign In or Create Account</span>
                        </li>
                        <li>
                            <icons.FaFacebookF className="" />
                        </li>
                        <li>
                            <icons.FaTwitter className="" />
                        </li>
                        <li>
                            <icons.FaInstagram className="" />
                        </li>
                        <li>
                            <icons.FaGoogle className="" />
                        </li>
                        <li>
                            <icons.FaPinterest className="" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-main flex m-auto items-center justify-between py-[30px]">
                <a href="/" className="">
                    <img src={logo} alt="" className="" />
                </a>
            </div>
        </div>
    );
};

export default Header;

import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import Navigation from "./Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import paths from "../ultils/paths";
import { getCurrent } from "../store/user/asyncAction";
import { logout } from "../store/user/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, current } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate(paths.LOGIN);
    };

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent());
        }, 300);

        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [dispatch, isLoggedIn]);

    return (
        <div className="">
            <div className="bg-main h-[36px]">
                <div className="w-main leading-[36px] flex m-auto items-center justify-between">
                    <ul className="text-[12px] text-[#fff] font-[400] flex items-center">
                        <li>
                            <span className="">
                                ORDER ONLINE OR CALL US (+1800) 000 8808
                            </span>
                            <span className="border-r-[1px] border-[#f8ca75] mx-[10px]"></span>
                        </li>
                        <li>
                            <div className="flex items-center cursor-pointer">
                                <icons.FaMoneyBillAlt className="mr-[6px] text-[16px]" />
                                <span className="text-[13px]">VND</span>
                                <icons.BiChevronDown className="mb-[2px] text-[20px] font-bold" />
                            </div>
                        </li>
                    </ul>
                    <ul className="text-[12px] text-[#fff] font-[400] flex items-center">
                        <li className="flex items-center border-r-[1px] border-[#f8ca75] leading-[20px]">
                            {isLoggedIn ? (
                                <React.Fragment>
                                    <div className="text-[14px] mr-[15px] cursor-pointer hover:text-[#000]">
                                        {`Hello ${current?.firstname?.toUpperCase()} ${current?.lastname?.toUpperCase()}`}
                                    </div>
                                    <div
                                        onClick={handleLogout}
                                        className="text-[13px] flex items-center mr-[15px] cursor-pointer hover:text-[#000]"
                                    >
                                        Logout
                                        <icons.MdLogout className="text-[20px] ml-[5px]" />
                                    </div>
                                </React.Fragment>
                            ) : (
                                <Link to={paths.LOGIN} className="mr-[10px]">
                                    Sign In or Create Account
                                </Link>
                            )}
                        </li>
                        <li className="cursor-pointer hover:text-[#000] border-r-[1px] border-[#f8ca75] h-[20px]">
                            <icons.FaFacebookF className="mx-[10px] text-[12px] mt-[4px]" />
                        </li>
                        <li className="cursor-pointer hover:text-[#000] border-r-[1px] border-[#f8ca75] h-[20px]">
                            <icons.FaTwitter className="mx-[10px] text-[12px] mt-[4px]" />
                        </li>
                        <li className="cursor-pointer hover:text-[#000] border-r-[1px] border-[#f8ca75] h-[20px]">
                            <icons.FaInstagram className="mx-[10px] text-[12px] mt-[4px]" />
                        </li>
                        <li className="cursor-pointer hover:text-[#000] border-r-[1px] border-[#f8ca75] h-[20px]">
                            <icons.FaGoogle className="mx-[10px] text-[12px] mt-[4px]" />
                        </li>
                        <li className="cursor-pointer hover:text-[#000] h-[20px]">
                            <icons.FaPinterest className="mx-[10px] text-[12px] mt-[4px]" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-main flex m-auto items-center justify-between py-[35px]">
                <Link to={paths.HOME} className="">
                    <img src={logo} alt="" className="" />
                </Link>
                <ul className="flex items-center">
                    <li className="ml-[20px] pr-[20px] border-r-[1px] border-[#e4e6eb]">
                        <div className="flex items-center text-[13px] font-[600]">
                            <icons.FaPhoneAlt className="text-main text-[13px] mr-[10px]" />
                            (+1800) 000 8808
                        </div>
                        <div className="text-[#3d3d3d] text-[12px]">
                            Mon-Sat 9:00AM - 8:00PM
                        </div>
                    </li>
                    <li className="ml-[20px] pr-[20px] border-r-[1px] border-[#e4e6eb]">
                        <div className="flex items-center text-[13px] font-[600] uppercase">
                            <icons.HiMail className="text-main text-[17px] mr-[10px]" />
                            support@tadathemes.com
                        </div>
                        <div className="text-[#3d3d3d] text-[12px] text-center">
                            Online Support 24/7
                        </div>
                    </li>
                    <li className="ml-[20px] pr-[20px] border-r-[1px] border-[#e4e6eb] h-[37px]">
                        <a href="/">
                            <icons.FiHeart className="text-[22px] text-main mt-[8px]" />
                        </a>
                    </li>
                    <li className="ml-[20px]">
                        <a href="/" className="flex items-center">
                            <icons.BsFillHandbagFill className="text-[22px] text-main mr-[6px]" />
                            <span className="text-[15px] text-[#3d3d3d] mt-[5px]">
                                1 item
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <Navigation />
        </div>
    );
};

export default Header;

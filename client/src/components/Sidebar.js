import React from "react";
import { NavLink } from "react-router-dom";
import icons from "../ultils/icons";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { categories } = useSelector((state) => state.app);
    return (
        <div className="">
            <div className="bg-main flex items-center px-[20px] py-[10px]">
                <icons.FaListUl className="text-[#fff] text-[16px] mr-[15px]" />
                <div className="uppercase text-[17px] font-[600] text-[#fff]">
                    All Collections
                </div>
            </div>
            <ul className="border-[1px] border-[#e4e6eb]">
                {categories?.map((item) => (
                    <li className="" key={item?._id}>
                        <NavLink
                            to={`/${item?.title.toLowerCase()}`}
                            className="flex items-start text-[15px] px-[20px] py-[14px] hover:text-main"
                        >
                            <img
                                src={item?.icon}
                                alt=""
                                className="w-[20px] h-[20px] object-cover mr-[10px]"
                            />
                            {item?.title} (8)
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

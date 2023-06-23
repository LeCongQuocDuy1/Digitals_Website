import React from "react";
import { NavLink } from "react-router-dom";
// import icons from "../ultils/icons";
import { navigation } from "../ultils/navigation";

const Navigation = () => {
    return (
        <div className="w-main flex m-auto items-center justify-between h-[50px] border-y-[1px] border-[#e4e6eb]">
            <ul className="flex items-center">
                {navigation.map((item) => (
                    <li className="mr-[30px]" key={item.id}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-main hover:text-main flex items-center text-[14px] text-[#000] uppercase leading-[50px]"
                                    : " hover:text-main flex items-center text-[14px] text-[#000] uppercase leading-[50px]"
                            }
                        >
                            {item.value}
                            {/* <icons.AiFillCaretDown className="ml-[5px] text-[10px]" /> */}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <form action="" className="w-[240px]">
                <input
                    type="text"
                    placeholder="Search something"
                    className="text-[14px] font-[300] border-none outline-none"
                />
            </form>
        </div>
    );
};

export default Navigation;

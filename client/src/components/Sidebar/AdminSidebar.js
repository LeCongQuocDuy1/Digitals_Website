import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import paths from "../../ultils/paths";
import icons from "../../ultils/icons";
import { adminSidebar } from "../../ultils/constants";

const AdminSidebar = () => {
    const [active, setActive] = useState([]);
    const handleShowTabs = (tabId) => {
        if (active.some((el) => el === tabId))
            setActive((prev) => prev.filter((el) => el !== tabId));
        else setActive((prev) => [...prev, tabId]);
    };

    return (
        <div className="w-full flex flex-wrap justify-center">
            <Link to={paths.HOME} className="">
                <img src={logo} alt="" className="object-cover" />
            </Link>
            <div className="mt-[60px]">
                {adminSidebar.map((item) => (
                    <React.Fragment key={item.id}>
                        {item.type === "single" && (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center p-3 hover:bg-[#f9bb487a] rounded-[10px] ${
                                        isActive
                                            ? "bg-[#f9ba48] hover:bg-[#f9ba48]"
                                            : ""
                                    }`
                                }
                            >
                                <span className="text-[24px] mr-[10px]">
                                    {item.icon}
                                </span>
                                <span className="text-[16px]">{item.text}</span>
                            </NavLink>
                        )}
                        {item.type === "parent" && (
                            <div
                                className=""
                                onClick={() => handleShowTabs(item.id)}
                            >
                                <div className="flex items-center p-3 cursor-pointer hover:bg-[#f9bb487a] rounded-[10px]">
                                    <span className="text-[24px] mr-[10px]">
                                        {item.icon}
                                    </span>
                                    <span className="text-[16px]">
                                        {item.text}
                                    </span>
                                    {active.some((id) => id === item.id) ? (
                                        <icons.AiFillCaretRight className="ml-[25px]" />
                                    ) : (
                                        <icons.AiFillCaretDown className="ml-[25px]" />
                                    )}
                                </div>
                                {active.some((id) => id === item.id) && (
                                    <div className="">
                                        {item.submenu.map((subitem) => (
                                            <NavLink
                                                key={subitem.text}
                                                to={subitem.path}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className={({ isActive }) =>
                                                    `flex items-center p-3 hover:bg-[#f9bb487a] rounded-[10px] pl-[46px] ${
                                                        isActive
                                                            ? "bg-[#f9ba48] hover:bg-[#f9ba48]"
                                                            : ""
                                                    }`
                                                }
                                            >
                                                {subitem.text}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;

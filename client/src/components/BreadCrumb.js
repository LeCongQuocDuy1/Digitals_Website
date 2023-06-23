import React from "react";
import icons from "../ultils/icons";

const BreadCrumb = ({ title, crumb }) => {
    return (
        <div className="header-contact bg-[#f7f7f7] mb-[20px]">
            <div className="title-top  w-main m-auto  py-[15px]">
                <h3 className="uppercase mb-[10px] text-[#151515] font-semibold text-[18px]">
                    {title}
                </h3>
                <span className="flex gap-[5px] text-[14px]">
                    <a href="/" className="hover:text-main">
                        Home
                    </a>
                    <icons.MdOutlineNavigateNext className="flex self-center" />
                    <a href="/">{crumb}</a>
                </span>
            </div>
        </div>
    );
};

export default BreadCrumb;

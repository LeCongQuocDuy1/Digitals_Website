import React from "react";
import { useSelector } from "react-redux";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";

const HotCollections = () => {
    const { categories } = useSelector((state) => state.app);
    return (
        <div className="w-main mb-[30px]">
            <div className="border-b-[3px] border-main w-full pb-[15px]">
                <div className="uppercase text-[#000] text-[20px] font-[600] leading-[25px]">
                    HOT COLLECTIONS
                </div>
            </div>
            <div className="grid grid-cols-3 gap-[20px] my-[20px]">
                {categories?.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-start gap-[20px] border-bd-main px-[40px] pt-[20px] pb-[40px]"
                    >
                        <div className="w-[150px] h-[150px]">
                            <img
                                src={item?.image}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="">
                            <div className="text-[#000] text-[16px] font-[600] mb-[10px] uppercase">
                                {item?.title}
                            </div>
                            <ul className="">
                                {item?.brand.map((br, index) => (
                                    <li key={index} className="mb-[4px]">
                                        <Link
                                            to={`/${br?.toLowerCase()}`}
                                            className="flex items-center text-[15px] text-[#999] hover:text-main"
                                        >
                                            <icons.MdNavigateNext className="text-[20px] text-inherit mr-[5px]" />
                                            {br}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotCollections;

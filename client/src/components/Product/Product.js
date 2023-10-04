import React, { useState } from "react";
import { renderRatings, formatMoney } from "../../ultils/helpers";
import SelectOptions from "../Select/SelectOptions";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";

const Product = ({ product, isNew }) => {
    const [isShowOptions, setIsShowOptions] = useState(false);

    return (
        <div
            onMouseEnter={(e) => {
                e.stopPropagation();
                setIsShowOptions(true);
            }}
            onMouseLeave={(e) => {
                e.stopPropagation();
                setIsShowOptions(false);
            }}
            className="relative border-bd-main bg-[rgb(255,255,255)] py-[20px] px-[15px]"
        >
            <Link
                to={`/${product?.category?.toLowerCase()}/${product?._id}/${
                    product?.title
                }`}
                className="block w-full mb-[20px] outline-none relative"
            >
                <img
                    src={product?.thumb}
                    alt="ok"
                    className="w-full h-full object-cover outline-none"
                />

                <div
                    className={`
                    absolute top-[-7px] right-[0px] px-[23px] py-[4px] text-[#fff] text-[11px]
                    font-bold ${
                        isNew ? `bg-[#ee3131]` : `bg-[#3173ee]`
                    } before:content-[''] before:block before:absolute before:left-[4px]
                    before:top-[9px] before:bg-[#fff] before:w-[6px] before:h-[6px] before:rounded-full
                    after:content-[''] after:block after:absolute after:left-[-24px]
                    after:top-0 ${
                        isNew
                            ? `after:border-r-[#ee3131]`
                            : `after:border-r-[#3173ee]`
                    } after:border-t-transparent after:border-b-transparent
                    after:border-l-transparent after:border-[12px] after:h-full
                    `}
                >
                    {isNew ? `NEW` : `TRENDING`}
                </div>
            </Link>
            <div className="text-left">
                <Link
                    to={`/${product?.category?.toLowerCase()}/${product?._id}/${
                        product?.title
                    }`}
                    className="block text-[16px] text-[#000] mb-[10px] hover:text-main one-line"
                >
                    {product?.title}
                </Link>
                <div className="flex items-center mb-[6px]">
                    {renderRatings(product?.totalRatings) || (
                        <React.Fragment>
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                        </React.Fragment>
                    )}
                </div>
                <div className="text-[16px] text-[#000]">
                    {`${formatMoney(product?.price)} VND`}
                </div>
            </div>
            {isShowOptions && (
                <div className="absolute bottom-[17%] right-[20%] z-[2] p-[20px] flex gap-[10px] items-center animate-slide-top">
                    <SelectOptions icon={<icons.BsFillSuitHeartFill />} />
                    <SelectOptions icon={<icons.HiOutlineViewList />} />
                    <SelectOptions icon={<icons.FaEye />} />
                </div>
            )}
        </div>
    );
};

export default Product;

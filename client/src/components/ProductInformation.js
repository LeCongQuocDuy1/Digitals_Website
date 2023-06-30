import React, { useState } from "react";
import Slider from "react-slick";
import Product from "./Product";
import { productInfos } from "../ultils/constants";

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
};

const ProductInformation = ({ products }) => {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <React.Fragment>
            <div className="flex items-center gap-[5px]">
                {productInfos.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                            activeTab === tab.id
                                ? `bg-white border-b-0 before:absolute before:block before:content-[''] before:left-0 before:bottom-[-3px] before:bg-white before:w-full before:h-[5px]`
                                : `bg-[#e0dfdf88]`
                        } cursor-pointer border-bd-main text-[16px] text-[#000] py-[10px] px-[15px] relative`}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className="bg-white border-bd-main py-[20px] px-[20px] w-full">
                {productInfos.map((tab) => (
                    <div key={tab.id} className="text-[14px] text-[#505050]">
                        {activeTab === tab.id && tab.content}
                    </div>
                ))}
            </div>
            <div className="mt-[30px] w-main mb-[100px]">
                <div className="border-b-[3px] border-main w-full pb-[15px]">
                    <div className="uppercase text-[#000] text-[20px] font-[600] leading-[25px]">
                        OTHER CUSTOMERS ALSO BUY:
                    </div>
                </div>
                <div className="mt-[50px]">
                    <Slider {...settings}>
                        {products?.map((item, index) => (
                            <Product
                                key={index}
                                product={item}
                                pid={item.id}
                                isNew={activeTab === "" ? false : true}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductInformation;

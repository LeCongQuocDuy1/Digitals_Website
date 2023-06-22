import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "./Product";
import { apiGetProducts } from "../apis/";

const tabs = [
    {
        id: 1,
        name: "Smartphone",
    },
    {
        id: 2,
        name: "Tablet",
    },
    {
        id: 3,
        name: "Laptop",
    },
];

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

const NewArrivals = () => {
    const [smartPhone, setSmartPhone] = useState(null);
    const [tablet, setTablet] = useState(null);
    const [laptop, setLaptop] = useState(null);
    const [products, setProducts] = useState(null);
    const [activeTab, setActiveTab] = useState("Smartphone");

    const fetchProducts = async () => {
        const response = await Promise.all([
            apiGetProducts({
                category: "Smartphone",
                limit: 6,
                sort: "-createdAt",
            }),
            apiGetProducts({
                category: "Tablet",
                limit: 6,
                sort: "-createdAt",
            }),
            apiGetProducts({
                category: "Laptop",
                limit: 6,
                sort: "-createdAt",
            }),
        ]);
        if (response[0]?.success) {
            setSmartPhone(response[0]?.products);
            setProducts(response[0]?.products);
        }
        if (response[1]?.success) {
            setTablet(response[1]?.products);
        }
        if (response[2]?.success) {
            setLaptop(response[2]?.products);
        }

        setProducts(response[0]?.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (activeTab === "Smartphone") setProducts(smartPhone);
        if (activeTab === "Tablet") setProducts(tablet);
        if (activeTab === "Laptop") setProducts(laptop);
    }, [activeTab, smartPhone, tablet, laptop]);

    return (
        <div className="mt-[30px] w-main mb-[40px]">
            <div className="flex items-center justify-between border-b-[3px] border-main w-full pb-[15px]">
                <div className="uppercase text-[#000] text-[20px] font-[600] leading-[25px]">
                    NEW ARRIVALS
                </div>
                <ul className="flex items-center">
                    {tabs.map((item) => (
                        <li
                            key={item.id}
                            className={`${
                                activeTab === item.name
                                    ? `text-main hover:text-main`
                                    : `text-[#999]`
                            } capitalize cursor-pointer text-[14px] leading-[25px] relative px-[24px] first:pl-[0] last:pr-[0] border-r-[.1px] border-[#ccc] last:border-r-[0px]`}
                            onClick={() => setActiveTab(item.name)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="my-[20px]">
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
    );
};

export default NewArrivals;

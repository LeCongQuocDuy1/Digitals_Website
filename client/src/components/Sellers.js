import React, { useEffect, useState } from "react";
import Product from "./Product";
import Slider from "react-slick";
import { apiGetProducts } from "../apis/";

const tabs = [
    {
        id: 1,
        name: "BEST SELLER",
    },
    {
        id: 2,
        name: "NEW ARRIVALS",
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

const Sellers = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await Promise.all([
            apiGetProducts({ sort: "-sold" }),
            apiGetProducts({ sort: "-createdAt" }),
        ]);
        if (response[0]?.success) {
            setBestSellers(response[0]?.products);
            setProducts(response[0]?.products);
        }
        if (response[1]?.success) {
            setNewProducts(response[1]?.products);
        }

        setProducts(response[0]?.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (activeTab === 1) setProducts(bestSellers);
        if (activeTab === 2) setProducts(newProducts);
    }, [activeTab, bestSellers, newProducts]);

    return (
        <div className="mt-[30px]">
            <ul className="flex items-center border-b-[3px] border-main w-full pb-[15px]">
                {tabs.map((item) => (
                    <li
                        key={item.id}
                        className={`uppercase cursor-pointer ${
                            activeTab === item.id
                                ? `text-[#000]`
                                : `text-[#999]`
                        } text-[20px] font-[600] leading-[25px] relative px-[24px] first:pl-[0] border-r-[.1px] border-[#ccc] last:border-r-[0px]`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <div className="my-[20px]">
                <Slider {...settings}>
                    {products?.map((item, index) => (
                        <Product
                            key={index}
                            product={item}
                            pid={item.id}
                            isNew={activeTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            </div>
            <div className="grid grid-cols-2 gap-[20px]">
                <a href="/" className="block max-h-[140px] w-full">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </a>
                <a href="/" className="block max-h-[140px] w-full">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </a>
            </div>
        </div>
    );
};

export default Sellers;

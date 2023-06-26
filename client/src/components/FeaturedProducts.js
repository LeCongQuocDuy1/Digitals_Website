import React, { useEffect, useState } from "react";
import { renderRatings, formatMoney } from "../ultils/helpers";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis";
import FeaturedGallery from "./FeaturedGallery";
import { Link } from "react-router-dom";
import paths from "../ultils/paths";

const FeaturedProducts = () => {
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await apiGetProducts({
            limit: 9,
            page: 1,
            totalRatings: 5,
        });

        if (response.success) setProducts(response?.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="mt-[30px] w-main mb-[100px]">
            <div className="flex items-center border-b-[3px] border-main w-full pb-[15px]">
                <div className="uppercase text-[#000] text-[20px] font-[600] leading-[25px]">
                    FEATURED PRODUCTS
                </div>
            </div>
            <div className="grid grid-cols-3 gap-[20px] my-[20px]">
                {products?.map((product) => (
                    <div
                        key={product?._id}
                        className="flex items-center border-bd-main pt-[30px] pb-[50px] px-[20px]"
                    >
                        <img
                            src={product?.thumb}
                            alt=""
                            className="w-[100px] h-[100px] mr-[20px] object-cover outline-none"
                        />
                        <div className="">
                            <Link
                                to={`/${paths.DETAIL_PRODUCT}/${product?._id}/${product?.title}`}
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
                    </div>
                ))}
            </div>
            <FeaturedGallery />
        </div>
    );
};

export default FeaturedProducts;

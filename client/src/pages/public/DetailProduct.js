import React, { useEffect, useState, useCallback } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import {
    ProductExtrainfo,
    SelectQuantity,
    ProductInformation,
} from "../../components";
import { apiGetProduct, apiGetProducts } from "../../apis/products";
import { formatMoney, renderRatings } from "../../ultils/helpers";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    easing: "linear",
    pauseOnHover: false,
};

const DetailProduct = () => {
    const { pid, category } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProducts() {
            const response = await apiGetProducts({ category });
            if (response.success) {
                setProducts(response.products);
            }
        }
        fetchProducts();
    }, [category]);

    useEffect(() => {
        async function fetchProduct() {
            const response = await apiGetProduct(pid);
            if (response.success) {
                setProduct(response.product);
            }
        }
        fetchProduct();
    }, [pid]);

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return;
        } else {
            setQuantity(number);
        }
    }, []);

    const handleChangeQuantity = useCallback(
        (flag) => {
            if (flag === "minus" && quantity === 1) return;
            if (flag === "minus") {
                setQuantity((prev) => +prev - 1);
            } else if (flag === "plus") {
                setQuantity((prev) => +prev + 1);
            }
        },
        [quantity]
    );
    return (
        <React.Fragment>
            <BreadCrumb title={product?.title} category={product?.category} />
            <div className="w-main m-auto mb-[50px]">
                <div className="grid grid-cols-[36%_60%] gap-[50px]">
                    <div className="bg-white">
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: "Wristwatch by Ted Baker London",
                                    isFluidWidth: true,
                                    src: product?.thumb,
                                },
                                largeImage: {
                                    src: product?.thumb,
                                    width: 1000,
                                    height: 1000,
                                },
                            }}
                            className="bg-white z-50"
                            imageClassName="w-full border-bd-main py-[20px]"
                            enlargedImageClassName="object-cover w-full"
                        />
                        <div className="my-[20px] overflow-x-hidden h-[200px]">
                            <Slider {...settings}>
                                {product?.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        className="border-bd-main h-[200px] object-cover"
                                    />
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <div className="text-[30px] font-[600] mb-[20px] text-[#000]">
                                {`${formatMoney(product?.price)} VND`}
                            </div>
                            <div className="flex items-center gap-[4px] mb-[20px] text-[14px]">
                                {renderRatings(product?.totalRatings)?.map(
                                    (star, index) => (
                                        <span key={index}>{star}</span>
                                    )
                                )}
                                {product?.totalRatings} review
                            </div>
                            <ul className="mb-[20px]">
                                {product?.description.map((desc, index) => (
                                    <li
                                        key={index}
                                        className="relative text-[14px] text-[#505050] before:absolute before:block before:content before:content-[''] before:w-[6px] before:h-[6px] before:bg-black before:top-[38%] before:left-[2px] pl-[22px] mb-[10px]"
                                    >
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                            <div className="">
                                <div className="flex items-center gap-[20px] mb-[20px]">
                                    <div className="flex flex-col justify-between gap-[20px] h-[200px]">
                                        <div className="text-[15px] font-[600] text-[#000]">
                                            Internal
                                        </div>
                                        <div className="text-[15px] font-[600] text-[#000]">
                                            Color
                                        </div>
                                        <div className="text-[15px] font-[600] text-[#000]">
                                            RAM
                                        </div>
                                        <div className="text-[15px] font-[600] text-[#000]">
                                            Quantity
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[15px]">
                                        <div className="flex items-center gap-[10px]">
                                            <div className="cursor-pointer border-[1px] border-main p-[10px] text-main text-[14px]">
                                                32GB
                                            </div>
                                            <div className="cursor-pointer border-[1px] border-[#ccc] p-[10px] text-[#505050] text-[14px]">
                                                64GB
                                            </div>
                                            <div className="cursor-pointer border-[1px] border-[#ccc] p-[10px] text-[#505050] text-[14px]">
                                                128GB
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-[10px]">
                                            <div className="cursor-pointer border-[1px] border-main p-[10px] text-main text-[14px]">
                                                BLACK
                                            </div>
                                            <div className="cursor-pointer border-[1px] border-[#ccc] p-[10px] text-[#505050] text-[14px]">
                                                WHITE
                                            </div>
                                            <div className="cursor-pointer border-[1px] border-[#ccc] p-[10px] text-[#505050] text-[14px]">
                                                GOLD
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-[10px]">
                                            <div className="cursor-pointer border-[1px] border-main p-[10px] text-main text-[14px]">
                                                2GB
                                            </div>
                                            <div className="cursor-pointer border-[1px] border-[#ccc] p-[10px] text-[#505050] text-[14px]">
                                                3GB
                                            </div>
                                        </div>
                                        <SelectQuantity
                                            quantity={quantity}
                                            handleQuantity={handleQuantity}
                                            handleChangeQuantity={
                                                handleChangeQuantity
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    value="ADD TO CART"
                                    type="button"
                                    wf={true}
                                />
                                <div className="flex items-center gap-[10px] mt-[20px]">
                                    <div className="p-[10px] bg-black rounded-full cursor-pointer hover:opacity-80">
                                        <icons.FaFacebookF className="text-[15px] text-white" />
                                    </div>
                                    <div className="p-[10px] bg-black rounded-full cursor-pointer hover:opacity-80">
                                        <icons.FaTwitter className="text-[15px] text-white" />
                                    </div>
                                    <div className="p-[10px] bg-black rounded-full cursor-pointer hover:opacity-80">
                                        <icons.FaPinterest className="text-[15px] text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <ProductExtrainfo
                                icon={
                                    <icons.FaShieldAlt className="text-[16px] text-white" />
                                }
                                name={"Guarantee"}
                                desc={"Quality Checked"}
                            />
                            <ProductExtrainfo
                                icon={
                                    <icons.MdLocalShipping className="text-[16px] text-white" />
                                }
                                name={"Free Shipping"}
                                desc={"Free On All Products"}
                            />
                            <ProductExtrainfo
                                icon={
                                    <icons.HiGift className="text-[16px] text-white" />
                                }
                                name={"Special Gift Cards"}
                                desc={"Special Gift Cards"}
                            />
                            <ProductExtrainfo
                                icon={
                                    <icons.FaShare className="text-[16px] text-white" />
                                }
                                name={"Free Return"}
                                desc={"Within 7 Days"}
                            />
                            <ProductExtrainfo
                                icon={
                                    <icons.ImPhoneHangUp className="text-[16px] text-white" />
                                }
                                name={"Consultancy"}
                                desc={"Lifetime 24/7/356"}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-[50px]">
                    <ProductInformation products={products} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailProduct;

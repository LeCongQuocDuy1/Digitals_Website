import React, { useEffect, useState, useCallback } from "react";
import BreadCrumb from "../../components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import ProductExtrainfo from "../../components/Product/ProductExtrainfo";
import ProductInformation from "../../components/Product/ProductInformation";
import SelectQuantity from "../../components/Select/SelectQuantity";
import icons from "../../ultils/icons";
import { apiGetProduct, apiGetProducts } from "../../apis/products";
import { formatMoney, renderRatings } from "../../ultils/helpers";
import { ToastContainer, toast } from "react-toastify";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import DOMPurify from "dompurify";

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
    const [currentThumb, setCurrentThumb] = useState(null);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [varriant, setVarriant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [update, setUpdate] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        title: "",
        thumb: "",
        images: [],
        price: "",
        color: "",
    });

    useEffect(() => {
        if (varriant) {
            setCurrentProduct({
                title:
                    product?.varriants?.find((el) => el.sku === varriant)
                        ?.title || product?.title,
                thumb:
                    product?.varriants?.find((el) => el.sku === varriant)
                        ?.thumb || product?.thumb,
                color:
                    product?.varriants?.find((el) => el.sku === varriant)
                        ?.color || product?.color,
                price:
                    product?.varriants?.find((el) => el.sku === varriant)
                        ?.price || product?.price,
                images:
                    product?.varriants?.find((el) => el.sku === varriant)
                        ?.images || product?.images,
            });
        }
    }, [varriant]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await apiGetProducts({ category });
            if (response.success) {
                setProducts(response.products);
            }
        };

        const fetchProduct = async () => {
            const response = await apiGetProduct(pid);
            if (response.success) {
                setProduct(response.product);
                setCurrentThumb(response?.product?.thumb);
            }
        };

        if (pid) fetchProduct(pid);
        fetchProducts();
        window.scrollTo(0, 0);
    }, [category, pid]);

    const rerender = useCallback(() => {
        setUpdate(!update);
    }, [update]);

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
                if (!(quantity > product?.quantity - 1)) {
                    setQuantity((prev) => +prev + 1);
                } else {
                    setIsFull(true);
                    toast.error(
                        "The quantity of products in stock is out of stock!"
                    );
                }
                return;
            }
        },
        [quantity]
    );

    const handleChangeThumb = (e, image) => {
        e.stopPropagation();
        setCurrentThumb(image);
    };

    return (
        <React.Fragment>
            <ToastContainer />
            <BreadCrumb
                title={currentProduct?.title || product?.title}
                category={currentProduct?.category || product?.category}
            />
            <div className="w-main m-auto mb-[50px]">
                <div className="grid grid-cols-[36%_60%] gap-[50px]">
                    <div className="bg-white">
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: "Wristwatch by Ted Baker London",
                                    isFluidWidth: true,
                                    src: currentProduct?.thumb || currentThumb,
                                },
                                largeImage: {
                                    src: currentProduct?.thumb || currentThumb,
                                    width: 1000,
                                    height: 1000,
                                },
                            }}
                            className="bg-white z-30 w-[440px] h-[564px] object-cover"
                            imageClassName="w-[440px] h-[564px] object-cover border-bd-main py-[20px]"
                            enlargedImageClassName="object-cover w-[440px] h-[564px]"
                        />
                        <div className="my-[20px] overflow-x-hidden h-[200px]">
                            <Slider {...settings}>
                                {currentProduct?.images.length === 0 &&
                                    product?.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            onClick={(e) =>
                                                handleChangeThumb(e, image)
                                            }
                                            alt=""
                                            className="border-bd-main h-[200px] object-cover cursor-pointer"
                                        />
                                    ))}
                                {currentProduct?.images.length > 0 &&
                                    currentProduct?.images.map(
                                        (image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                onClick={(e) =>
                                                    handleChangeThumb(e, image)
                                                }
                                                alt=""
                                                className="border-bd-main h-[200px] object-cover cursor-pointer"
                                            />
                                        )
                                    )}
                            </Slider>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <div className="col-span-2">
                            <div className="flex items-center justify-between mb-[20px]">
                                <div className="text-[30px] font-[600] text-[#000]">
                                    {`${formatMoney(
                                        currentProduct?.price || product?.price
                                    )} VND`}
                                </div>
                                <span className="text-[14px] text-red-500">
                                    In stock: {product?.quantity}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mb-[20px]">
                                <div className="flex items-center gap-[4px] text-[14px]">
                                    {renderRatings(product?.totalRatings)?.map(
                                        (star, index) => (
                                            <span key={index}>{star}</span>
                                        )
                                    )}
                                    {product?.ratings?.length} review
                                </div>
                                <span className="text-[14px] text-red-500">
                                    (Sold: {product?.sold} pieces)
                                </span>
                            </div>
                            <ul className="mb-[20px]">
                                {product?.description?.length > 1 &&
                                    product?.description.map((desc, index) => (
                                        <li
                                            key={index}
                                            className="relative text-[14px] text-[#505050] before:absolute before:block before:content before:content-[''] before:w-[6px] before:h-[6px] before:bg-black before:top-[38%] before:left-[2px] pl-[22px] mb-[10px]"
                                        >
                                            {desc}
                                        </li>
                                    ))}
                                {product?.description?.length === 1 && (
                                    <div
                                        className="text-[14px] text-[#505050]"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                product?.description[0]
                                            ),
                                        }}
                                    ></div>
                                )}
                            </ul>
                            <div className="">
                                <div className="flex gap-[20px] mb-[20px]">
                                    <div className="flex flex-col">
                                        <div className="text-[15px] font-[600] text-[#000] mb-[34px]">
                                            Internal
                                        </div>
                                        <div className="text-[15px] font-[600] text-[#000] mb-[55px]">
                                            Color
                                        </div>
                                        <div className="text-[15px] font-[600] text-[#000] mb-[35px]">
                                            RAM
                                        </div>
                                        <div className="text-[15px] font-[600] text-[#000] mb-[20px]">
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
                                            <div
                                                onClick={() =>
                                                    setVarriant(null)
                                                }
                                                className={`cursor-pointer border-[1px] ${
                                                    !varriant
                                                        ? "border-main text-main"
                                                        : "border-[#ccc] text-[#505050] hover:border-main hover:text-main"
                                                } p-[10px] text-[14px] flex items-center gap-2`}
                                            >
                                                <img
                                                    src={product?.thumb}
                                                    alt=""
                                                    className="w-8 h-8 rounded-md object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <span>
                                                        {product?.color}
                                                    </span>
                                                    <span className="text-sm">
                                                        {product?.price}
                                                    </span>
                                                </div>
                                            </div>
                                            {product?.varriants.map(
                                                (item, index) => {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                setVarriant(
                                                                    item.sku
                                                                )
                                                            }
                                                            key={index}
                                                            className={`cursor-pointer border-[1px] ${
                                                                varriant ===
                                                                item?.sku
                                                                    ? "border-main text-main"
                                                                    : "border-[#ccc] text-[#505050] hover:border-main hover:text-main"
                                                            } p-[10px] text-[14px] flex items-center gap-2`}
                                                        >
                                                            <img
                                                                src={
                                                                    item?.thumb
                                                                }
                                                                alt=""
                                                                className="w-8 h-8 rounded-md object-cover"
                                                            />
                                                            <div className="flex flex-col">
                                                                <span>
                                                                    {
                                                                        item?.color
                                                                    }
                                                                </span>
                                                                <span className="text-sm">
                                                                    {
                                                                        item?.price
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
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
                                            isFull={isFull}
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
                    <ProductInformation
                        products={products}
                        product={product}
                        pid={pid}
                        rerender={rerender}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailProduct;

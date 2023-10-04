import React, { useCallback, useState } from "react";
import Slider from "react-slick";
import Product from "../Product/Product";
import { productInfos } from "../../ultils/constants";
import VoteBar from "../Vote/VoteBar";
import VoteOption from "../Vote/VoteOption";
import { renderRatings } from "../../ultils/helpers";
import { apiRatings } from "../../apis/products";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import Swal from "sweetalert2";
import paths from "../../ultils/paths";
import { useNavigate } from "react-router-dom";
import Comment from "../Common/Comment";

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
};

const ProductInformation = ({ products, product, pid, rerender }) => {
    const [activeTab, setActiveTab] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.user);

    let percentRate = 0;

    if (+product?.ratings.length === 1) {
        percentRate = product?.ratings[0].star;
    } else {
        percentRate = +product?.ratings
            .map((item) => item.star)
            .reduce((sum, item) => {
                return (sum += item / 2);
            }, 0);
    }

    const handleSubmitVote = useCallback(
        async ({ comment, score }) => {
            if (!comment || !pid || !score) {
                alert("Please vote before submitting!");
                return;
            }
            await apiRatings({
                star: score,
                comment: comment,
                pid,
                updatedAt: Date.now(),
            });
            dispatch(
                showModal({
                    isShowModal: false,
                    modalChildren: null,
                })
            );
            rerender();
        },
        [pid, dispatch, rerender]
    );

    const handleValidateVote = () => {
        if (!isLoggedIn) {
            Swal.fire(
                "Oops!",
                "Please login your account to vote!",
                "error"
            ).then((rs) => {
                if (rs.isConfirmed) navigate(`/${paths.LOGIN}`);
            });
        } else {
            dispatch(
                showModal({
                    isShowModal: true,
                    modalChildren: (
                        <VoteOption
                            nameProduct={product?.title}
                            handleSubmitVote={handleSubmitVote}
                        />
                    ),
                })
            );
        }
    };

    return (
        <React.Fragment>
            <div className="flex items-center gap-[5px]">
                {productInfos?.map((tab) => (
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
                <div
                    onClick={() => setActiveTab(5)}
                    className={`${
                        activeTab === 5
                            ? `bg-white border-b-0 before:absolute before:block before:content-[''] before:left-0 before:bottom-[-3px] before:bg-white before:w-full before:h-[5px]`
                            : `bg-[#e0dfdf88]`
                    } cursor-pointer border-bd-main text-[16px] text-[#000] py-[10px] px-[15px] relative`}
                >
                    CUSTOMER REVIEW
                </div>
            </div>
            <div className="bg-white border-bd-main pt-[20px] px-[20px] w-full">
                {productInfos.map((tab) => (
                    <div key={tab.id} className="text-[14px] text-[#505050]">
                        {activeTab === tab.id && tab.content}
                    </div>
                ))}
                {activeTab === 5 && (
                    <div className="bg-white">
                        <div className="text-[18px] text-black font-[500] mb-[20px]">
                            Reviews & Comments {product?.title}
                        </div>
                        <div className="grid grid-cols-3 border-bd-main rounded-[20px] mb-[10px]">
                            <div className="m-auto text-center">
                                <p className="text-[24px] font-[600] mb-[5px]">
                                    {percentRate}
                                    /5
                                </p>
                                <div className="flex items-center justify-center gap-[6px] mb-[5px]">
                                    {renderRatings(
                                        Math.round(percentRate) || 5
                                    )?.map((star, index) => (
                                        <span key={index}>{star}</span>
                                    ))}
                                </div>
                                <div className="text-[16px]">
                                    <span className="text-[16px] font-[600] mr-1">
                                        {product?.ratings.length}
                                    </span>
                                    reviews and comments
                                </div>
                            </div>
                            <div className="border-l-[1px] border-l-bd-main col-span-2 py-[10px] px-[30px]">
                                <div className="flex flex-col gap-[10px]">
                                    {Array.from(Array(5).keys())
                                        .reverse()
                                        .map((item) => (
                                            <VoteBar
                                                key={item}
                                                number={item + 1}
                                                ratingCount={
                                                    product?.ratings.filter(
                                                        (rating) =>
                                                            rating.star ===
                                                            item + 1
                                                    )?.length
                                                }
                                                ratingTotal={
                                                    product?.ratings.length
                                                }
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-[16px] text-black text-center w-full mb-[10px]">
                            How would you rate this product?
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={handleValidateVote}
                                className="w-[300px] m-auto flex justify-center items-center hover:bg-[#383838] bg-main text-[#fff] text-center text-[18px] py-[10px] mb-[20px] uppercase"
                            >
                                Rate now
                            </button>
                        </div>
                        {product?.ratings.map((item) => (
                            <Comment
                                key={item?._id}
                                content={item?.comment}
                                star={item?.star}
                                updatedAt={item?.updatedAt}
                                name={`${item?.postedBy?.firstname} ${item?.postedBy?.lastname}`}
                            />
                        ))}
                    </div>
                )}
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

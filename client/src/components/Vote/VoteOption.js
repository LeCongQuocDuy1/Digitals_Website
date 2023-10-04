import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { voteOptions } from "../../ultils/constants";
import icons from "../../ultils/icons";

const VoteOption = ({ nameProduct, handleSubmitVote }) => {
    const [activeStar, setActiveStar] = useState(null);
    const [comment, setComment] = useState("");

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-[600px] bg-white rounded-[10px] p-[20px]"
        >
            <img src={logo} alt="" className="object-cover mb-[50px] mx-auto" />
            <h2 className="text-[18px] text-black font-[500] mb-[20px] text-center">
                Đánh giá & nhận xét {nameProduct}
            </h2>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="6"
                className="border-bd-main rounded-[10px] text-[16px] text-black mb-[20px]"
                placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm"
            ></textarea>
            <div className="border-bd-main rounded-[10px] w-[full] p-[10px] mb-[20px]">
                <h2 className="text-[18px] text-black font-[500] mb-[20px]">
                    Bạn thấy sản phẩm này như thế nào?
                </h2>
                <div className="w-full flex items-center justify-between px-[30px] gap-[10px]">
                    {voteOptions.map((item) => (
                        <div
                            onClick={() => setActiveStar(item?.id)}
                            className="cursor-pointer flex flex-col gap-[5px] items-center"
                            key={item?.id}
                        >
                            <icons.AiFillStar
                                className={`text-[16px] ${
                                    Number(activeStar) && activeStar >= item?.id
                                        ? `text-main`
                                        : `text-black`
                                }`}
                            />
                            <div className="text-[16px] text-black">
                                {item?.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => handleSubmitVote({ comment, score: activeStar })}
                className="w-full m-auto flex justify-center items-center hover:bg-[#383838] bg-main text-[#fff] text-center text-[18px] py-[10px] uppercase"
            >
                Send Rate
            </button>
        </div>
    );
};

export default VoteOption;

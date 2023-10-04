import React, { useRef, useEffect } from "react";
import icons from "../../ultils/icons";

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
    const percentRef = useRef();

    useEffect(() => {
        percentRef.current.style = `width: ${
            Math.round(ratingCount / ratingTotal) * 100
        }%`;
    }, [ratingCount, ratingTotal]);

    return (
        <div className="flex items-center justify-between gap-[20px]">
            <div className="flex items-center gap-[4px]">
                <div className="text-[16px] font-semibold">{number}</div>
                <icons.AiFillStar className="text-[18px] font-[600] text-main" />
            </div>
            <div
                className={`relative rounded-[5px] w-[100%] h-[7px] bg-[#ccc] text-left`}
            >
                <div
                    ref={percentRef}
                    className={`absolute rounded-[5px] h-[7px] bg-main text-left`}
                ></div>
            </div>
            <div className="text-[12px] text-[#666] whitespace-nowrap">
                {ratingCount || 0} đánh giá
            </div>
        </div>
    );
};

export default VoteBar;

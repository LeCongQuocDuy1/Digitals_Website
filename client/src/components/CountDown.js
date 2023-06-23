import React from "react";

const CountDown = ({ unit, number }) => {
    return (
        <div className="h-[64px] w-full bg-[#d3d3d33d] flex flex-col items-center justify-center">
            <div className="text-[#000] text-[18px] font-[600]">{number}</div>
            <div className="text-[#999] text-[13px]">{unit}</div>
        </div>
    );
};

export default CountDown;

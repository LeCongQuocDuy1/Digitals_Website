import React, { memo } from "react";

const SelectQuantity = ({
    quantity,
    isFull,
    handleQuantity,
    handleChangeQuantity,
}) => {
    console.log(isFull);

    return (
        <div className="flex items-center bg-[#f6f6f6] w-[110px]">
            <div
                onClick={() => handleChangeQuantity("minus")}
                className="cursor-pointer hover:bg-main px-[10px] py-[7px]"
            >
                -
            </div>
            <input
                className="border-r border-l border-[#000] text-center px-[2px] py-[7px] outline-none bg-transparent w-[50px]"
                type="text"
                value={quantity}
                onChange={(e) => handleQuantity(e.target.value)}
            />
            <div
                onClick={() => handleChangeQuantity("plus")}
                className={`cursor-pointer ${
                    isFull ? "opacity-30" : "hover:bg-main"
                } px-[10px] py-[7px]`}
            >
                +
            </div>
        </div>
    );
};

export default memo(SelectQuantity);

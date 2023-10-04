import React from "react";

const Button = ({ value, type, style, wf, handleOnClick, icon }) => {
    return (
        <button
            type={type}
            className={
                style ||
                `${
                    wf ? "w-full" : "w-[100px]"
                } m-auto flex justify-center items-center hover:bg-[#383838] bg-main text-[#fff] text-center text-[18px] py-[10px] mb-[20px] uppercase`
            }
            onClick={() => {
                handleOnClick && handleOnClick();
            }}
        >
            {value || ""}
            {icon || ""}
        </button>
    );
};

export default Button;

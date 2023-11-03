import React from "react";

const Button = ({
    value,
    type = "button",
    style,
    wf,
    handleOnClick,
    icon,
    cancel,
}) => {
    return (
        <button
            type={type}
            className={
                style ||
                `${wf ? "w-full" : "w-[100px]"} m-auto flex justify-center ${
                    cancel ? "bg-error" : "bg-main"
                } items-center hover:bg-[#383838] text-[#fff] text-center text-[18px] py-[10px] mb-[20px] uppercase`
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

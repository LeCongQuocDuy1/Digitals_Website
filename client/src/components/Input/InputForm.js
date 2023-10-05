import React from "react";

const InputForm = ({
    label,
    disabled,
    register,
    errors,
    id,
    validate,
    type = "text",
    placeholder,
    width,
    defaultValue,
}) => {
    return (
        <div className="">
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={`my-[5px] outline-none border-none ${
                    width ? width : "w-full"
                } text-[16px] focus:shadow-transparent bg-[#eff2f2] text-[#000]`}
                defaultValue={defaultValue}
            />
            {errors[id] && (
                <div className="w-full text-error text-[10px]">
                    {`${errors[id]?.message}`}
                </div>
            )}
        </div>
    );
};

export default InputForm;

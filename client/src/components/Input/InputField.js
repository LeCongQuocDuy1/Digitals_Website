import React from "react";

const InputField = ({
    value,
    setValue,
    nameKey,
    type,
    invalidFields,
    setInvalidFields,
    width,
    icon,
    placeholder,
    handleKeyPress,
}) => {
    return (
        <React.Fragment>
            <div className="flex items-center gap-2 bg-[#eff2f2]  mb-[12px]">
                <input
                    type={type || ""}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            [nameKey]: e.target.value,
                        }))
                    }
                    onFocus={() => setInvalidFields && setInvalidFields([])}
                    onKeyPress={handleKeyPress}
                    className={`outline-none border-none ${
                        width ? width : "w-full"
                    } py-[15px] px-[15px] text-[16px] bg-[#eff2f2] text-[#000]`}
                />
                {icon}
            </div>

            {invalidFields?.some((item) => item.name === nameKey) && (
                <div className="w-full border-bd-main border-error text-error text-[13px] py-[4px] px-[30px] bg-[#fff6f6] mb-[25px]">
                    {`${
                        invalidFields.find((item) => item.name === nameKey)
                            ?.message
                    }`}
                </div>
            )}
        </React.Fragment>
    );
};

export default InputField;

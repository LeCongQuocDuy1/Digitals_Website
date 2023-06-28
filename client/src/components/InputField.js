import React from "react";

const InputField = ({
    value,
    setValue,
    nameKey,
    type,
    invalidFields,
    setInvalidFields,
}) => {
    return (
        <React.Fragment>
            <input
                type={type || "text"}
                value={value}
                placeholder={nameKey}
                onChange={(e) =>
                    setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
                }
                onFocus={() => setInvalidFields([])}
                className="outline-none placeholder:capitalize w-full text-[16px] placeholder:text-[#afb0b0] text-[#000] bg-[#eff2f2] py-[10px] px-[15px] mb-[12px]"
            />
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

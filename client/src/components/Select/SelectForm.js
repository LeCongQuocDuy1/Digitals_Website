import React, { memo } from "react";

const SelectForm = ({
    label,
    options = [],
    register,
    errors,
    id,
    validate,
    style,
    fullWidth,
    defaultValue,
}) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <label htmlFor={id}>{label}</label>}
            <select
                defaultValue={defaultValue}
                id={id}
                {...register(id, validate)}
            >
                <option value="">CHOOSE</option>
                {options.map((el) => (
                    <option value={el.code} key={el.code}>
                        {el.value}
                    </option>
                ))}
            </select>
            {errors[id] && (
                <div className="w-full text-error text-[10px]">
                    {`${errors[id]?.message}`}
                </div>
            )}
        </div>
    );
};

export default memo(SelectForm);

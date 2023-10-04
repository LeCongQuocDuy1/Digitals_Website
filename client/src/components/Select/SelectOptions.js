import React from "react";

const SelectOptions = ({ icon }) => {
    return (
        <div className="border-[1px] border-[#ccc] px-[10px] py-[10px] bg-white rounded-full hover:bg-black hover:text-white cursor-pointer hover:border-[#000]">
            {icon}
        </div>
    );
};

export default SelectOptions;

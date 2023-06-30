import React from "react";

const ProductExtrainfo = ({ icon, name, desc }) => {
    return (
        <div className="flex items-center gap-[10px] border-[1px] border-[#ccc] bg-white py-[10px] px-[15px] mb-[12px]">
            <div className="p-[8px] bg-gray-600 rounded-full">{icon}</div>
            <div className="flex flex-col">
                <div className="text-[14px] text-black">{name}</div>
                <div className="text-[12px] text-[#666]">{desc}</div>
            </div>
        </div>
    );
};

export default ProductExtrainfo;

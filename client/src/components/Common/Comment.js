import React from "react";
import avatar from "../../assets/avatarDefault.png";
import moment from "moment";
import { renderRatings } from "../../ultils/helpers";

const Comment = ({
    image = avatar,
    name = "Anonymous",
    updatedAt,
    content,
    star,
}) => {
    return (
        <div className="">
            <div className="flex items-start w-full gap-[15px] mb-[15px]">
                <img
                    src={image}
                    alt="Avatar"
                    className="w-[40px] h-[40px] rounded-full"
                />
                <div className="w-full">
                    <div className="flex items-center justify-between mb-[10px]">
                        <h3 className="text-[18px] text-black font-[600] capitalize">
                            {name}
                        </h3>
                        <span className="text-[14px] italic">
                            {moment(updatedAt)?.fromNow()}
                        </span>
                    </div>
                    <div className="border-bd-main bg-[#dddddd79] p-[10px]">
                        <div className="flex items-center">
                            <span className="text-[16px] text-black mr-[55px] font-[600]">
                                Vote:
                            </span>
                            {renderRatings(star)?.map((item, index) => (
                                <span key={index}>{item}</span>
                            ))}
                        </div>
                        <div className="flex items-start">
                            <span className="text-[16px] text-black mr-[10px] font-[600]">
                                Comment:
                            </span>
                            <span className="text-[14px] text-black w-full">
                                {content}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;

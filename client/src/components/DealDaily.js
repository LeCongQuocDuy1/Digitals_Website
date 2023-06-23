import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/";
import { renderRatings, formatMoney, secondsToHms } from "../ultils/helpers";
import moment from "moment";
import icons from "../ultils/icons";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import paths from "../ultils/paths";

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({
            limit: 1,
            page: Math.round(Math.random() * 9),
            totalRatings: 5,
        });

        if (response.success) {
            setDealDaily(response.products[0]);

            const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
            const seconds =
                new Date(today).getTime() -
                new Date().getTime() +
                24 * 3600 * 1000;
            const number = secondsToHms(seconds);
            setHour(number.h);
            setMinute(number.m);
            setSecond(number.s);
        } else {
            setHour(0);
            setMinute(59);
            setSecond(59);
        }
    };

    useEffect(() => {
        fetchDealDaily();
    }, [expireTime]);

    useEffect(() => {
        let interval = setInterval(() => {
            if (second > 0) {
                setSecond((prev) => prev - 1);
            } else if (minute > 0) {
                setMinute((prev) => prev - 1);
                setSecond(59);
            } else if (hour > 0) {
                setHour((prev) => prev - 1);
                setMinute(59);
                setSecond(59);
            } else {
                setExpireTime(!expireTime);
            }
        }, 1000);

        // cleanup
        return () => {
            clearInterval(interval);
        };
    }, [second, minute, hour, expireTime]);

    return (
        <div className="relative mt-[30px] border-bd-main bg-[#fff] pt-[85px] px-[20px] pb-[27px]">
            <div className="absolute top-[15px] left-[20px] gap-[50px] flex items-center">
                <icons.AiFillStar className="text-[24px] text-main" />
                <div className="uppercase text-[#000] text-[20px] font-[600]">
                    DAILY DEALS
                </div>
            </div>
            <Link
                to={`/${paths.DETAIL_PRODUCT}/${dealDaily?._id}/${dealDaily?.title}`}
                className="block w-full mb-[30px] outline-none"
            >
                <img
                    src={dealDaily?.thumb}
                    alt=""
                    className="w-full h-full object-cover outline-none"
                />
            </Link>
            <div className="text-center">
                <Link
                    to={`/${paths.DETAIL_PRODUCT}/${dealDaily?._id}/${dealDaily?.title}`}
                    className="block text-[18px] text-[#000] mb-[10px] hover:text-main one-line"
                >
                    {dealDaily?.title}
                </Link>
                <div className="flex items-center justify-center mb-[6px]">
                    {renderRatings(dealDaily?.totalRatings) || (
                        <React.Fragment>
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                            <icons.AiOutlineStar className="text-[14px] text-yellow-500 mb-[3px]" />
                        </React.Fragment>
                    )}
                </div>
                <div className="text-[18px] text-[#000]">
                    {`${formatMoney(dealDaily?.price)} VND`}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-[5px] my-[16px]">
                <CountDown unit="Hours" number={hour} />
                <CountDown unit="Minutes" number={minute} />
                <CountDown unit="Seconds" number={second} />
            </div>
            <a
                href="/"
                className="flex items-center w-full gap-3 justify-center hover:bg-[#383838] bg-main text-[#fff] text-[16px] py-[10px]"
            >
                <icons.HiOutlineViewList className="text-[20px] text-[#fff]" />
                OPTIONS
            </a>
        </div>
    );
};

export default DealDaily;

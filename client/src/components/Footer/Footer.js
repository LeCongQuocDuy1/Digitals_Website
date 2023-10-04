import React from "react";
import icons from "../../ultils/icons";

const Footer = () => {
    const product_tag = [
        { name: "10-20" },
        { name: "20-50" },
        { name: "200-300" },
        { name: "300-400" },
        { name: "400-500" },
        { name: "50-100" },
        { name: "500-600" },
        { name: "600-700" },
        { name: "700-800" },
        { name: "800-900" },
        { name: "900-1000" },
        { name: "Accessories" },
        { name: "Acer" },
    ];

    return (
        <div className="footer">
            <div className="head-footer bg-main">
                <div className="w-main m-auto flex justify-between py-[25px]">
                    <div className="head-left">
                        <p className="text-[#fff] font-normal text-[20px]">
                            SIGN UP TO NEWSLETTER
                        </p>
                        <span className="text-[#fff] opacity-60 text-[13px]">
                            Subscribe now and receive weekly newsletter
                        </span>
                    </div>
                    <div className="head-right w-[50%]">
                        <form className="email-form relative">
                            <input
                                type="email"
                                className="text-[#ffffff] w-[100%] h-[50px] px-[20px] rounded-[30px] placeholder:text-[#ffffffa6] outline-0 border-0 bg-[rgba(255,255,255,.1);]"
                                placeholder="Email address"
                            />
                            <button
                                type="submit"
                                className="absolute px-[25px] h-[50px] top-0 right-0"
                            >
                                <icons.HiMail className="text-[#ffffff] text-[16px]" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="middle-footer bg-[#191919] py-[50px]">
                <div className="w-main m-auto flex gap-[100px]">
                    <div className="about-us relative">
                        <span className="title uppercase text-[#ffffff] text-[15px] relative font-semibold mb-[20px] pl-[15px] before:content-[''] before:block before:absolute before:bg-main before:w-[3px] before:h-[100%]">
                            {" "}
                            About us
                        </span>
                        <div className="info-ft mt-[20px]">
                            <ul className="flex-col flex gap-[10px] mb-[20px]">
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <icons.MdPlace className="text-[16px] grid self-center" />
                                        <span className="font-normal">
                                            Adress:
                                        </span>
                                        <span className="opacity-60">
                                            474 Ontario St Toronto, ON M4X 1M7
                                            Canada
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <icons.FaPhoneAlt className="text-[16px] grid self-center" />
                                        <span className="font-normal">
                                            Phone:
                                        </span>
                                        <span className="opacity-60">
                                            (+1234)56789xxx
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <icons.HiMail className="text-[16px] grid self-center" />
                                        <span className="font-normal">
                                            Mail:
                                        </span>
                                        <span className="opacity-60">
                                            tadathemes@gmail.com
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <div className="list-social flex flex-row gap-[5px] text-[#ffffff] text-[16px]">
                                <a
                                    href="/"
                                    className=" flex justify-center items-center text-[16px] rounded-[3px] h-[40px] w-[40px] bg-[rgba(255,255,255,.1)]"
                                >
                                    <icons.FaFacebookF />
                                </a>
                                <a
                                    href="/"
                                    className="flex justify-center items-center text-[16px] rounded-[3px] h-[40px] w-[40px] bg-[rgba(255,255,255,.1)]"
                                >
                                    <icons.FaTwitter />
                                </a>
                                <a
                                    href="/"
                                    className="flex justify-center items-center text-[16px] rounded-[3px] h-[40px] w-[40px] bg-[rgba(255,255,255,.1)]"
                                >
                                    <icons.FaPinterest />
                                </a>
                                <a
                                    href="/"
                                    className="flex justify-center items-center text-[16px] rounded-[3px] h-[40px] w-[40px] bg-[rgba(255,255,255,.1)]"
                                >
                                    <icons.FaGoogle />
                                </a>
                                <a
                                    href="/"
                                    className="flex justify-center items-center text-[16px] rounded-[3px] h-[40px] w-[40px] bg-[rgba(255,255,255,.1)]"
                                >
                                    <icons.ImLinkedin2 />
                                </a>
                                <a
                                    href="/"
                                    className="flex justify-center items-center text-[16px] rounded-[3px] h-[40px] w-[40px] bg-[rgba(255,255,255,.1)]"
                                >
                                    <icons.FaFlickr />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="information">
                        <span className="title uppercase text-[#ffffff] text-[15px] relative font-semibold mb-[20px] pl-[15px] before:content-[''] before:block before:absolute before:bg-main before:w-[3px] before:h-[100%]">
                            Information
                        </span>
                        <div className="info-ft mt-[20px]">
                            <ul className="flex-col flex gap-[10px] mb-[20px]">
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Typography
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Gallery
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Store Location
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Today's Deals
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Contact
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="who-we-are">
                        <span className="title uppercase text-[#ffffff] text-[15px] relative font-semibold mb-[20px] pl-[15px] before:content-[''] before:block before:absolute before:bg-main before:w-[3px] before:h-[100%]">
                            WHO WE ARE
                        </span>
                        <div className="info-ft mt-[20px]">
                            <ul className="flex-col flex gap-[10px] mb-[20px]">
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">Help</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Free Shipping
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">FAQs</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Return & Exchange
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        className="flex text-[#ffffff] text-[13px] gap-[5px]"
                                    >
                                        <span className="opacity-60">
                                            Testimonials
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="digital-store">
                        <span className="title uppercase text-[#ffffff] text-[15px] relative font-semibold mb-[20px] pl-[15px] before:content-[''] before:block before:absolute before:bg-main before:w-[3px] before:h-[100%]">
                            #DIGITALWORLDSTORE
                        </span>
                        <div className="info-ft mt-[20px]"></div>
                    </div>
                </div>
                <div className="w-main m-auto mt-[30px]">
                    <div className="product-tag pb-[20px]">
                        <span className="title uppercase text-[#ffffff] text-[15px] relative font-semibold mb-[20px] pl-[15px] before:content-[''] before:block before:absolute before:bg-main before:w-[3px] before:h-[100%] ">
                            Product tags
                        </span>
                    </div>
                    <div className="tags-info flex ">
                        {product_tag.map((item, index) => (
                            <a
                                href="/"
                                className="text-[#ffffff] text-[13px] relative opacity-60 px-[10px] border-r-[.1px] border-[#ffffffa6] last:border-r-[0px]"
                                key={index}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom-footer bg-[#0f0f0f]">
                <div className="w-main m-auto flex justify-between py-[20px]">
                    <div className="digital flex items-center">
                        <a href="/" className="text-[#b7b7b7] text-[13px]">
                            © 2023, Digital World 2 Powered by Shopify
                        </a>
                    </div>
                    <div className="list-brand flex gap-[25px]">
                        <a href="/">
                            <icons.SiVisa className="text-[40px] text-white" />
                        </a>
                        <a href="/">
                            <icons.FaCcMastercard className="text-[40px] text-white" />
                        </a>
                        <a href="/">
                            <icons.SiWebmoney className="text-[40px] text-white" />
                        </a>
                        <a href="/">
                            <icons.FaCcPaypal className="text-[40px] text-white" />
                        </a>
                        <a href="/">
                            <icons.MdPayments className="text-[40px] text-white" />
                        </a>
                        <a href="/">
                            <icons.SiDiscover className="text-[40px] text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

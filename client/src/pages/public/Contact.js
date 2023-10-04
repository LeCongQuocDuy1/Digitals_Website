import React from "react";
import BreadCrumb from "../../components/Common/BreadCrumb";
import icons from "./../../ultils/icons";

const Contact = () => {
    return (
        <div>
            <BreadCrumb title="CONTACT US" crumb="Contact Us" />
            <div className="contact-map w-main m-auto pb-[40px]">
                <div className="map mb-[40px]">
                    <iframe
                        title="contact-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.2453203459086!2d107.59194381103585!3d16.463111228706822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13e8ec40d09%3A0xc669dbfc2743e474!2sVincom%20Plaza%20Hu%E1%BA%BF!5e0!3m2!1svi!2s!4v1687423050048!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="contact-info flex justify-between gap-[20px]">
                    <div className="info text-[14px] font-normal w-[50%]">
                        <p className="mb-[10px]">
                            Sed vestibulum faucibus felis, sit amet facilisis
                            tellus. Aliquam erat volutpat. Sed consectetur ipsum
                            velit, quis rhoncus libero egestas eget.
                        </p>
                        <ul>
                            <li className="flex gap-[15px]">
                                <icons.BiMapPin className="text-main flex self-center" />
                                Address: 474 Ontario St Toronto, ON M4X 1M7
                                Canada
                            </li>
                            <li>
                                <span className="flex gap-[15px]">
                                    <icons.BsCheck className="text-main flex self-center" />
                                    Opening hours
                                </span>
                                <ul className="ml-[20px] leading-6">
                                    <li>Mon-Fri : 11.00 - 20.00</li>
                                    <li>Sat: 10.00 - 20.00</li>
                                    <li>Sun: 19.00 - 20.00</li>
                                </ul>
                            </li>
                            <li className="flex gap-[15px]">
                                <icons.HiMail className="text-main flex self-center" />
                                <a href="email:support@tadathemes.com">
                                    {" "}
                                    Email: support@tadathemes.com
                                </a>
                            </li>
                            <li className="flex gap-[15px]">
                                <icons.FaPhoneAlt className="text-main flex self-center" />
                                <a href="tel:(+123)345 678 xxx">
                                    Phone: (+123) 678 xxx
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="form-contact w-[50%]">
                        <form action="">
                            <div className="name-email flex justify-between gap-[10px] mb-[10px]">
                                <div className="name w-[50%]">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="px-[10px] py-[8px] bg-[#f6f6f6] text-[#1c1d1d] text-[14px] font-light w-[100%]"
                                    />
                                </div>
                                <div className="email w-[50%]">
                                    <input
                                        type="Email"
                                        placeholder="Email"
                                        className="px-[10px] py-[8px] bg-[#f6f6f6] text-[#1c1d1d] text-[14px] font-light w-[100%]"
                                    />
                                </div>
                            </div>
                            <div className="phone-number mb-[10px]">
                                <input
                                    type="number"
                                    placeholder="Phone number"
                                    className="px-[10px] py-[8px] bg-[#f6f6f6] text-[#1c1d1d] text-[14px] font-light w-[100%]"
                                />
                            </div>
                            <div className="phone-number mb-[10px]">
                                <textarea
                                    type="text"
                                    placeholder="Message"
                                    className="px-[10px] py-[8px] bg-[#f6f6f6] text-[#1c1d1d] text-[14px] font-light w-[100%] h-[120px]"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className=" px-[15px] py-[11px] text-[14px] font-normal uppercase bg-main text-[#ffffff] hover:bg-[#333] "
                                >
                                    {" "}
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

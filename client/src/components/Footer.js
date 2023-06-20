import React from 'react'
import icons from "../ultils/icons"; 

const Footer = () => {
  return (
    <div className="footer bg-main">
         <div className="head-footer w-main m-auto flex justify-between py-[25px]">
             <div className="head-left">
                <p className="text-[#fff] font-normal text-[20px]">SIGN UP TO NEWSLETTER</p>
                <span className="text-[#fff] opacity-60 text-[13px]">Subscribe now and receive weekly newsletter</span>
             </div>
             <div className="head-right w-[50%]">
               <form  className="email-form relative">
                <input type="email" className='text-[#ffffff]  w-[100%] h-[50px] px-[20px] rounded-[30px] placeholder:text-[#ffffffa6]   outline-0 border-0 bg-[rgba(255,255,255,.1);]' placeholder="Email address"/>
                    <button type='submit' className="absolute px-[25px] h-[50px] top-0 right-0">
                         <icons.HiMail className="text-[#ffffff] text-[16px]"/>
                    </button>
               </form>
             </div>
         </div>
        <div className="middle-footer">

        </div>
        <div className="bottom-footer">

        </div>
    </div>
  );
};

export default Footer;
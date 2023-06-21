import React from "react";
import { Sidebar, Banner, Sellers } from "../../components/";
const Home = () => {
    return (
        <div className="w-main flex gap-[24px] items-start mt-[20px] mb-[1000px] mx-auto">
            <div className="w-[25%] max-h-[480px]">
                <Sidebar />
            </div>
            <div className="w-[75%] max-h-[480px]">
                <Banner />
                <Sellers />
            </div>
        </div>
    );
};

export default Home;

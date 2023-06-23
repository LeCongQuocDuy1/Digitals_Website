import React from "react";
import { Sidebar, Banner, Sellers, DealDaily } from "../../components/";
const Home = () => {
    return (
        <div className="w-main flex gap-[24px] items-start mt-[20px] mx-auto mb-[200px]">
            <div className="w-[26%]">
                <Sidebar />
                <DealDaily />
            </div>
            <div className="w-[74%]">
                <Banner />
                <Sellers />
            </div>
        </div>
    );
};

export default Home;

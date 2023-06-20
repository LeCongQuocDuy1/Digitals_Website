import React from "react";
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";

const Home = () => {
    return (
        <div className="w-main flex gap-[24px] items-start mt-[20px] mx-auto">
            <div className="w-[25%] max-h-[480px]">
                <Sidebar />
            </div>
            <div className="w-[75%] max-h-[480px]">
                <Banner />
            </div>
        </div>
    );
};

export default Home;

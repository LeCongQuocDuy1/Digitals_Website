import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import { apiGetProducts } from "../../apis/";

const Home = () => {
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await apiGetProducts();
            console.log(response);
        };
        fetchProducts();
    }, []);

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

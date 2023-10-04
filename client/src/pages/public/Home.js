import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Banner from "../../components/Common/Banner";
import Sellers from "../../components/Common/Sellers";
import DealDaily from "../../components/Common/DealDaily";
import FeaturedProducts from "../../components/Featured/FeaturedProducts";
import NewArrivals from "../../components/Common/NewArrivals";
import HotCollections from "../../components/Common/HotCollections";
// import { apiGetProducts } from "../../apis/";
// import { useSelector } from "react-redux";

const Home = () => {
    // const { newProducts } = useSelector((state) => state.product);
    // const { categories } = useSelector((state) => state.app);
    // const { isLoggedIn, current } = useSelector((state) => state.user);

    return (
        <React.Fragment>
            <div className="w-main flex gap-[24px] items-start mt-[20px] mx-auto">
                <div className="w-[26%]">
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className="w-[74%]">
                    <Banner />
                    <Sellers />
                </div>
            </div>
            <div className="w-main m-auto">
                <FeaturedProducts />
                <NewArrivals />
                <HotCollections />
            </div>
        </React.Fragment>
    );
};

export default Home;

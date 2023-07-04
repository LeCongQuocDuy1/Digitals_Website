// import React, { useState, useEffect } from "react";
import React from "react";
import {
    Sidebar,
    Banner,
    Sellers,
    DealDaily,
    FeaturedProducts,
    NewArrivals,
    HotCollections,
} from "../../components/";
// import { apiGetProducts } from "../../apis/";
// import { useSelector } from "react-redux";

const Home = () => {
    // const { newProducts } = useSelector((state) => state.product);
    // const { categories } = useSelector((state) => state.app);
    // const { isLoggedIn, current } = useSelector((state) => state.user);
    // const [products, setProducts] = useState(null);

    // useEffect(() => {
    //     async function fetchProducts() {
    //         const response = await apiGetProducts();
    //         if (response.success) {
    //             setProducts(response.products);
    //         }
    //     }
    //     fetchProducts();
    // }, []);

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

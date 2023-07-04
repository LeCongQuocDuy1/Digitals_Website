import React, { useState, useEffect, useCallback } from "react";
import {
    useParams,
    useNavigate,
    useSearchParams,
    createSearchParams,
} from "react-router-dom";
import { BreadCrumb, Product, FilterItem } from "../../components/";
import { apiGetProducts } from "../../apis/";
import { sorts } from "../../ultils/constants";

const Products = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const [sort, setSort] = useState("");
    const [activeFilter, setActiveFilter] = useState(false);
    const [params] = useSearchParams();

    useEffect(() => {
        const fetchProductsByCategory = async (queries) => {
            const response = await apiGetProducts({ ...queries, category });
            if (response.success) {
                setProducts(response.products);
            }
        };
        let param = [];
        for (let i of params.entries()) param?.push(i);
        const queries = [];
        for (let i of params) queries[i[0]] = i[1];

        let priceQuery = {};

        if (queries.from && queries.to) {
            priceQuery = {
                $and: [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } },
                ],
            };
            delete queries.price;
        }

        if (queries.from) {
            queries.price = { gte: queries.from };
        }

        if (queries.to) {
            queries.price = { lte: queries.to };
        }

        delete queries.from;
        delete queries.to;

        const q = { ...priceQuery, ...queries };

        fetchProductsByCategory(q);
    }, [params, category]);

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeFilter === name) setActiveFilter(null);
            else setActiveFilter(name);
        },
        [activeFilter]
    );

    useEffect(() => {
        navigate({
            pathnames: `/${category}`,
            search: createSearchParams({
                sort,
            }).toString(),
        });
    }, [sort, category, navigate]);

    return (
        <div>
            <BreadCrumb title={category} />
            <div className="w-main m-auto bg-white py-[30px]">
                <div className="w-full border-bd-main flex items-center justify-between pt-[15px] px-[20px] pb-[20px]">
                    <div className="">
                        <div className="text-[15px] font-[600] text-black mb-[10px]">
                            Filter by
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <FilterItem
                                name="Price"
                                activeFilter={activeFilter}
                                changeActiveFilter={changeActiveFilter}
                                setActiveFilter={setActiveFilter}
                            />
                            <FilterItem
                                name="Color"
                                activeFilter={activeFilter}
                                changeActiveFilter={changeActiveFilter}
                                setActiveFilter={setActiveFilter}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="text-[15px] font-[600] text-black mb-[10px]">
                            Sort by
                        </div>
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                            }}
                            className="w-[250px] cursor-pointer border-[#999] hover:border-[#000] border-[1px] pl-[20px] pr-[10px] text-[12px] py-[12px] bg-white"
                        >
                            {sorts?.map((item) => (
                                <option key={item.id} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full grid grid-cols-4 gap-[20px] my-[20px]">
                    {products?.map((item, index) => (
                        <Product
                            key={index}
                            product={item}
                            pid={item.id}
                            isNew={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;

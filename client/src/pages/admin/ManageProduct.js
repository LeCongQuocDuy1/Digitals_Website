import React, { useEffect, useState } from "react";
import InputField from "../../components/Input/InputField";
import { useForm } from "react-hook-form";
import icons from "../../ultils/icons";
import Pagination from "../../components/Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import { apiGetProducts } from "../../apis/products";
import { formatCurrency } from "../../ultils/helpers";
import { useSearchParams } from "react-router-dom";

const ManageProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [searchValue, setSearchValue] = useState({
        q: "",
    });
    const [params] = useSearchParams();
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [counts, setCounts] = useState(0);

    const queriesDebounce = useDebounce(searchValue.q, 800);

    const handleUpdate = async (data) => {
        // const response = await apiUpdateUser(data, editUser._id);
        // if (response.success) {
        //     render();
        //     setEditUser(null);
        //     toast.success(response.message);
        // } else {
        //     toast.error(response.message);
        // }
    };

    const handleDelete = async (uid) => {
        // Swal.fire({
        //     title: "Deleted user!",
        //     text: "Are you ready remove this user?",
        //     showCancelButton: true,
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         const response = await apiDeleteUser(uid);
        //         if (response.success) {
        //             render();
        //             toast.success(response.message);
        //         } else {
        //             toast.error(response.message);
        //         }
        //     }
        // });
    };

    useEffect(() => {
        const fetchProducts = async (params) => {
            const response = await apiGetProducts({
                ...params,
                limit: process.env.REACT_APP_PRODUCT_LIMIT,
            });
            if (response.success) {
                setProducts(response.products);
                setCounts(response.counts);
            }
        };

        const queries = Object.fromEntries([...params]);
        if (queriesDebounce) queries.q = queriesDebounce;

        fetchProducts(queries);
    }, [params, queriesDebounce]);

    return (
        <div className="bg-white h-screen p-5">
            <h1 className="text-[28px] font-bold">Manage Products</h1>

            <div className="flex justify-end py-4 mt-[50px]">
                <InputField
                    nameKey="q"
                    value={searchValue.q}
                    setValue={setSearchValue}
                    width={"w-[300px]"}
                    placeholder="Search products..."
                    icon={
                        <icons.BiSearch className="text-[24px] cursor-pointer" />
                    }
                />
            </div>
            <div className="">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <table className="shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Thumb
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sold
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ratings
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={index}
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            {(params.get("page") - 1) *
                                                process.env
                                                    .REACT_APP_PRODUCT_LIMIT +
                                                index +
                                                1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <img
                                                src={product?.thumb}
                                                alt=""
                                                className="w-[100px] h-[50px]"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{`${product?.title}`}</td>
                                    <td className="px-6 py-4">{`${product?.category}`}</td>
                                    <td className="px-6 py-4">
                                        {formatCurrency(product?.price)}
                                    </td>
                                    <td className="px-6 py-4">{`${product?.quantity}`}</td>
                                    <td className="px-6 py-4">{`${product?.sold}`}</td>
                                    <td className="px-6 py-4">{`${product?.color}`}</td>
                                    <td className="px-6 py-4">{`${product?.totalRatings}`}</td>
                                    <td className="px-6 py-4 flex items-center gap-2 h-[180px]">
                                        <div
                                            // onClick={() =>
                                            //     handleUpdateEl(user)
                                            // }
                                            className="flex justify-center w-full font-medium bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                                        >
                                            Edit
                                        </div>
                                        <div
                                            // onClick={() =>
                                            //     handleDelete(user._id)
                                            // }
                                            className="flex justify-center w-full font-medium bg-red-500 hover:bg-red-600 text-white p-2 rounded-md cursor-pointer"
                                        >
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

                <div className="p-3">
                    <Pagination title="products" totalCount={counts} />
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;

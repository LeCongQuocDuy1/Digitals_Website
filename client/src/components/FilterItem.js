import React, { useState, useEffect } from "react";
import { colors } from "../ultils/constants";
import icons from "../ultils/icons";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../apis";
import { formatMoney } from "../ultils/helpers";
import useDebounce from "../hooks/useDebounce";

const FilterItem = ({
    name,
    activeFilter,
    changeActiveFilter,
    setActiveFilter,
}) => {
    const [selected, setSelected] = useState([]);
    const [price, setPrice] = useState({
        from: 0,
        to: 0,
    });
    const [bestPrice, setBestPrice] = useState(null);
    const { category } = useParams();
    const navigate = useNavigate();

    const fetchBestPriceProduct = async () => {
        const response = await apiGetProducts({ sort: "-price", limit: 1 });
        if (response.success) {
            setBestPrice(response.products[0].price);
        }
    };

    useEffect(() => {
        if (name === "Price") {
            fetchBestPriceProduct();
        }
    }, [name]);

    const handleSelect = (e) => {
        const alreadyEl = selected.find((el) => el === e.target.value);
        if (alreadyEl)
            setSelected((prev) => prev.filter((el) => el !== e.target.value));
        else setSelected((prev) => [...prev, e.target.value]);
        changeActiveFilter([]);
    };

    useEffect(() => {
        if (selected.length > 0) {
            navigate({
                pathnames: `/${category}`,
                search: createSearchParams({
                    color: selected.join(","),
                }).toString(),
            });
        } else {
            navigate({
                pathnames: `/${category}`,
                search: "",
            });
        }
    }, [selected, category, navigate]);

    const debouncePriceFrom = useDebounce(price.from, 500);
    const debouncePriceTo = useDebounce(price.to, 500);

    useEffect(() => {
        const data = {};
        if (Number(price.from) > 0) data.from = price.from;
        if (Number(price.to) > 0) data.to = price.to;

        navigate({
            pathnames: `/${category}`,
            search: createSearchParams(data).toString(),
        });
    }, [
        debouncePriceFrom,
        debouncePriceTo,
        category,
        navigate,
        price.from,
        price.to,
    ]);

    return (
        <div
            onClick={() => changeActiveFilter(name)}
            className="relative flex items-center justify-between gap-[30px] cursor-pointer border-[#999] hover:border-[#000] border-[1px] pl-[20px] pr-[10px] text-[12px] py-[12px] bg-white"
        >
            <div className="">{name}</div>
            <icons.FiChevronDown />
            {activeFilter === name && name === "Price" && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bg-[#fff] z-20 border-bd-main w-[350px] left-[-1px] top-[48px] flex-col"
                >
                    <div className="py-[15px] px-[20px] border-b-[1px] flex items-end">
                        <div className="text-[14px] text-[#000]">
                            The highest price is{" "}
                            {`${formatMoney(bestPrice)} VND`}
                            <br />
                            Default input value is USD
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setPrice({
                                    from: 0,
                                    to: 0,
                                });
                                setActiveFilter(false);
                            }}
                            className="underline text-[14px] text-[#000]"
                        >
                            Reset
                        </div>
                    </div>
                    <div className="py-[30px] px-[10px]">
                        <div className="flex items-center gap-[16px]">
                            <div className="flex items-center gap-[6px]">
                                <div className="text-[13px] text-[#000]">
                                    From
                                </div>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setPrice((prev) => ({
                                            ...prev,
                                            from: e.target.value,
                                        }))
                                    }
                                    value={price[0]}
                                    className="bg-[#f6f6f6] py-[10px] px-[6px] w-[124px] text-[#000] text-[16px]"
                                />
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <div className="text-[13px] text-[#000]">
                                    To
                                </div>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setPrice((prev) => ({
                                            ...prev,
                                            to: e.target.value,
                                        }))
                                    }
                                    value={price[1]}
                                    className="bg-[#f6f6f6] py-[10px] px-[6px] w-[124px] text-[#000] text-[16px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeFilter === name && name === "Color" && (
                <div className="absolute bg-[#fff] z-20 border-bd-main w-[350px] h-[250px] overflow-x-hidden overflow-y-scroll left-[-1px] top-[48px] flex-col">
                    <div className="absolute top-0 left-0 right-0 z-20 bg-white">
                        <div className="py-[15px] px-[20px] border-b-[1px] flex items-center justify-between">
                            <div className="text-[14px] text-[#000]">
                                {selected.length} selected
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected([]);
                                }}
                                className="underline text-[14px] text-[#000]"
                            >
                                Reset
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="pt-[70px] pb-[10px] px-[20px]"
                    >
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-[10px] w-full mb-[10px]"
                            >
                                <input
                                    id={color}
                                    value={color}
                                    onChange={handleSelect}
                                    type="checkbox"
                                    className="form-checkbox focus-within:hidden"
                                    checked={selected.some(
                                        (selectedItem) => selectedItem === color
                                    )}
                                />
                                <label
                                    htmlFor={color}
                                    className="text-[15px] text-[#000] mt-[1px] cursor-pointer font-[500] flex-1 capitalize"
                                >
                                    {color}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterItem;

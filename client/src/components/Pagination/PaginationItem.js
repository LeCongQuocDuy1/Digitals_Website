import React, { useEffect } from "react";
import {
    useSearchParams,
    useNavigate,
    useParams,
    createSearchParams,
} from "react-router-dom";

const PaginationItem = ({ children }) => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [params] = useSearchParams();
    useEffect(() => {}, [params]);

    const handlePagination = () => {
        let param = [];
        for (let i of params.entries()) param?.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (Number(children)) queries.page = children;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
        window.scrollTo(0, 0);
    };

    return (
        <button
            type="button"
            disabled={!Number(children)}
            onClick={handlePagination}
            className={`w-10 h-10 cursor-pointer items-center ${
                !Number(children) &&
                "pt-[5px] cursor-default hover:rounded-none hover:bg-transparent"
            } flex justify-center ${
                +params.get("page") === +children && "rounded-full bg-gray-300"
            } ${
                !+params.get("page") &&
                +children === 1 &&
                "rounded-full bg-gray-300"
            } hover:rounded-full hover:bg-gray-300`}
        >
            {children}
        </button>
    );
};

export default PaginationItem;

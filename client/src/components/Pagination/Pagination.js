import React from "react";
import PaginationItem from "./PaginationItem";
import usePagination from "../../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
// totalPage = 66, limitProductOnPage = 10 => (66 / 10) = 6.6 = 7 pages
// totalPaginationItem = sib + 5;

const Pagination = ({ title, totalCount }) => {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, params.get("page") || 1);
    const range = () => {
        const currentPage = +params.get("page");
        const pagesize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
        const start = (currentPage - 1) * pagesize + 1;
        const end = Math.min(currentPage * pagesize, totalCount);
        return `${start} - ${end}`;
    };

    return (
        <div className="flex justify-between items-center">
            {!+params.get("page") && (
                <span className="">{`Show ${title} 1 - ${
                    process.env.REACT_APP_PRODUCT_LIMIT || 10
                } of ${totalCount}`}</span>
            )}
            {!+params.get("page") ? (
                <div className=""></div>
            ) : (
                <span className="">{`Show ${title} ${range()} of ${totalCount}`}</span>
            )}
            <div className="flex items-center">
                {pagination?.map((item) => (
                    <PaginationItem key={item}>{item}</PaginationItem>
                ))}
            </div>
        </div>
    );
};

export default Pagination;

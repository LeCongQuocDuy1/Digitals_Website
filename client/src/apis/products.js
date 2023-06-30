import axios from "../axios";

export const apiGetProducts = (params) =>
    axios({
        url: "/product/",
        method: "GET",
        params,
    });

export const apiGetProduct = (pid) =>
    axios({
        url: "/product/" + pid,
        method: "GET",
    });

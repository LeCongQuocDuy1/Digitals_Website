import axios from "../axios";

export const apiGetCategory = () =>
    axios({
        url: "/productCategory/",
        method: "GET",
    });

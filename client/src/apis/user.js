import axios from "../axios";

export const apiRegister = (data) =>
    axios({
        url: "/user/register",
        method: "POST",
        data,
        withCredentials: true,
    });

export const apiFinalRegister = (token) =>
    axios({
        url: "/user/finalregister/" + token,
        method: "PUT",
    });

export const apiLogin = (data) =>
    axios({
        url: "/user/login",
        method: "POST",
        data,
    });

export const apiForgotPassword = (data) =>
    axios({
        url: "/user/forgot-password",
        method: "POST",
        data,
    });

export const apiResetPassword = (data) =>
    axios({
        url: "/user/reset-password",
        method: "PUT",
        data,
    });

export const apiGetCurrent = () =>
    axios({
        url: "/user/current",
        method: "get",
    });

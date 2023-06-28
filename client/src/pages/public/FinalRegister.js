import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import paths from "../../ultils/paths";
import Swal from "sweetalert2";

const FinalRegister = () => {
    const { status } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "failed")
            Swal.fire("Oops!", "Register account failed!", "error").then(() => {
                navigate(`/${paths.LOGIN}`);
            });
        if (status === "successed")
            Swal.fire(
                "Configuration!",
                "Register account successfully!",
                "success"
            ).then(() => {
                navigate(`/${paths.LOGIN}`);
            });
    }, [status, navigate]);

    return (
        <div className="">
            <h1>Registing...</h1>
        </div>
    );
};

export default FinalRegister;

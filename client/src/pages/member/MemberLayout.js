import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import paths from "../../ultils/paths";
import { useSelector } from "react-redux";

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    console.log(isLoggedIn, current);
    if (!isLoggedIn || !current)
        return <Navigate to={`/${paths.LOGIN}`} replace={true} />;

    return (
        <div>
            MemberLayout
            <Outlet />
        </div>
    );
};

export default MemberLayout;

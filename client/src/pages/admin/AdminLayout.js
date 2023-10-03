import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import paths from "../../ultils/paths";
import { useSelector } from "react-redux";

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);

    if (!isLoggedIn || !current || +current.role !== 0)
        return <Navigate to={`/${paths.LOGIN}`} replace={true} />;

    return (
        <div>
            <h1>Adminlayout</h1>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

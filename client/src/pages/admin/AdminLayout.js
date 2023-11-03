import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import paths from "../../ultils/paths";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);

    if (!isLoggedIn || !current || +current.role !== 0)
        return <Navigate to={`/${paths.LOGIN}`} replace={true} />;

    return (
        <div className="flex items-start h-full relative ml-[270px]">
            <div className="h-full bg-[#080707] w-[270px] text-white py-7 fixed left-0 top-0 bottom-0">
                <AdminSidebar />
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

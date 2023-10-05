import React, { useEffect, useState } from "react";
import { apiGetUsers } from "../../apis/user";
import Moment from "moment";
import InputField from "../../components/Input/InputField";
import Pagination from "../../components/Pagination/Pagination";
import icons from "../../ultils/icons";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const ManageUser = () => {
    const [users, setUsers] = useState(null);
    const [searchValue, setSearchValue] = useState({
        q: "",
    });
    const [params] = useSearchParams();
    const queriesDebounce = useDebounce(searchValue.q, 800);
    useEffect(() => {
        const fetchUsers = async (params) => {
            const response = await apiGetUsers({
                ...params,
                limit: process.env.REACT_APP_PRODUCT_LIMIT,
            });
            if (response.success) {
                setUsers(response);
            }
        };

        const queries = Object.fromEntries([...params]);
        if (queriesDebounce) queries.q = queriesDebounce;

        fetchUsers(queries);
    }, [queriesDebounce, params]);

    return (
        <div className="bg-white h-screen p-5">
            <h1 className="text-[28px] font-bold">Manage Users</h1>

            <div className="flex justify-end py-4 mt-[50px]">
                <InputField
                    nameKey="q"
                    value={searchValue.q}
                    setValue={setSearchValue}
                    width={"w-[300px]"}
                    placeholder="Search users with full name or email..."
                    icon={
                        <icons.BiSearch className="text-[24px] cursor-pointer" />
                    }
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.users?.map((user, index) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={index}
                            >
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        {index + 1}
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                        alt="Jese "
                                    />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            {`${user?.firstname} ${user?.lastname}`}
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            {user?.email}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">{`${
                                    user?.role === "0" ? "Admin" : "Member"
                                }`}</td>
                                <td className="px-6 py-4">{user?.mobile}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {user?.isBlocked ? (
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                        ) : (
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                        )}
                                        {user?.isBlocked ? "Blocked" : "Active"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {Moment(user?.createdAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <div className="flex justify-center w-full font-medium bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md cursor-pointer">
                                        Edit
                                    </div>
                                    <div className="flex justify-center w-full font-medium bg-red-500 hover:bg-red-600 text-white p-2 rounded-md cursor-pointer">
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-3">
                    <Pagination title="users" totalCount={users?.counts} />
                </div>
                <div
                    id="editUserModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative w-full max-w-2xl max-h-full">
                        <form
                            action="#"
                            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                        >
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit user
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="editUserModal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Bonnie"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Green"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="example@company.com"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="phone-number"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            name="phone-number"
                                            id="phone-number"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="e.g. +(12)3456 789"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="department"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            name="department"
                                            id="department"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Development"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="company"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Company
                                        </label>
                                        <input
                                            type="number"
                                            name="company"
                                            id="company"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="123456"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="current-password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="current-password"
                                            id="current-password"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="••••••••"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="new-password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="new-password"
                                            id="new-password"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="••••••••"
                                            required=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save all
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;

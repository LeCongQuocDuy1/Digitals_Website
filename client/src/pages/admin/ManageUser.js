import React, { useCallback, useEffect, useState } from "react";
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "../../apis/user";
import InputField from "../../components/Input/InputField";
import SelectForm from "../../components/Select/SelectForm";
import InputForm from "../../components/Input/InputForm";
import Pagination from "../../components/Pagination/Pagination";
import icons from "../../ultils/icons";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { roles, blockStatus } from "../../ultils/constants";

const ManageUser = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        role: "",
        status: "",
    });
    const [users, setUsers] = useState(null);
    const [update, setUpdate] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [searchValue, setSearchValue] = useState({
        q: "",
    });
    const [params] = useSearchParams();
    const render = useCallback(() => {
        setUpdate(!update);
    }, [update]);
    const queriesDebounce = useDebounce(searchValue.q, 800);

    const handleUpdateEl = (user) => {
        setEditUser(user);
    };

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editUser._id);
        if (response.success) {
            render();
            setEditUser(null);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handleDelete = async (uid) => {
        Swal.fire({
            title: "Deleted user!",
            text: "Are you ready remove this user?",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.success) {
                    render();
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
        });
    };

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
    }, [queriesDebounce, params, update]);

    console.log(editUser);

    return (
        <div className="bg-white h-screen p-5">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <h1 className="text-[28px] font-bold">Manage Users</h1>

            <div className="flex justify-end py-4 mt-[50px]">
                <InputField
                    nameKey="q"
                    value={searchValue.q}
                    setValue={setSearchValue}
                    width={"w-[300px]"}
                    placeholder="Search users..."
                    icon={
                        <icons.BiSearch className="text-[24px] cursor-pointer" />
                    }
                />
            </div>
            <div className="">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editUser && (
                        <div className="">
                            <button
                                type="submit"
                                className="hover:bg-[#383838] bg-main text-[#fff] text-center text-[18px] py-[10px] mb-[20px] uppercase h-[40px] w-[100px]"
                            >
                                Update
                            </button>
                        </div>
                    )}
                    <table className="shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
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
                                    <td className="px-6 py-4">
                                        {editUser?._id === user?._id ? (
                                            <InputForm
                                                defaultValue={
                                                    editUser?.firstname
                                                }
                                                register={register}
                                                errors={errors}
                                                id={"firstname"}
                                                validate={{
                                                    required:
                                                        "Name is required!",
                                                }}
                                            />
                                        ) : (
                                            <div>{`${user?.firstname} ${user?.lastname}`}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editUser?._id === user?._id ? (
                                            <InputForm
                                                defaultValue={editUser?.email}
                                                register={register}
                                                errors={errors}
                                                id={"email"}
                                                validate={{
                                                    required:
                                                        "Email is required!",
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message:
                                                            "Please enter a valid email",
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <div>{user?.email}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editUser?._id === user?._id ? (
                                            <SelectForm
                                                defaultValue={+editUser?.role}
                                                register={register}
                                                errors={errors}
                                                id={"role"}
                                                validate={{
                                                    required:
                                                        "Role is required!",
                                                }}
                                                options={roles}
                                            />
                                        ) : (
                                            <span>
                                                {user?.role === "0"
                                                    ? "Admin"
                                                    : "Member"}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editUser?._id === user?._id ? (
                                            <InputForm
                                                defaultValue={editUser?.mobile}
                                                register={register}
                                                errors={errors}
                                                id={"mobile"}
                                                validate={{
                                                    required:
                                                        "Phone is required!",
                                                    pattern: {
                                                        value: /^0\d{9}$/,
                                                        message:
                                                            "Invalid phone number",
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <span>{user?.mobile}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {editUser?._id === user?._id ? (
                                                <SelectForm
                                                    defaultValue={
                                                        editUser?.isBlocked
                                                    }
                                                    register={register}
                                                    errors={errors}
                                                    id={"isBlocked"}
                                                    validate={{
                                                        required:
                                                            "Active is required!",
                                                    }}
                                                    options={blockStatus}
                                                />
                                            ) : (
                                                <React.Fragment>
                                                    {user?.isBlocked ? (
                                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                    ) : (
                                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                    )}
                                                    {user?.isBlocked
                                                        ? "Blocked"
                                                        : "Active"}
                                                </React.Fragment>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {editUser?._id === user?._id ? (
                                            <div
                                                onClick={() =>
                                                    setEditUser(null)
                                                }
                                                className="flex justify-center w-full font-medium bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                                            >
                                                Back
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    handleUpdateEl(user)
                                                }
                                                className="flex justify-center w-full font-medium bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                                            >
                                                Edit
                                            </div>
                                        )}
                                        <div
                                            onClick={() =>
                                                handleDelete(user._id)
                                            }
                                            className="flex justify-center w-full font-medium bg-red-500 hover:bg-red-600 text-white p-2 rounded-md cursor-pointer"
                                        >
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

                <div className="p-3">
                    <Pagination title="users" totalCount={users?.counts} />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;

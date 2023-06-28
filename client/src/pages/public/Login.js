import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputField, Button } from "../../components";
import {
    apiLogin,
    apiRegister,
    apiForgotPassword,
    apiFinalRegister,
} from "../../apis/user";
import Swal from "sweetalert2";
import paths from "../../ultils/paths";
import { login } from "../../store/user/userSlice";
import { validate } from "../../ultils/helpers";

const Login = () => {
    const [payload, setPayload] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        mobile: "",
    });
    const [token, setToken] = useState("");
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const resetPayload = () => {
        setPayload({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            mobile: "",
        });
    };
    useEffect(() => {
        resetPayload();
    }, [isRegister]);

    const handleSubmit = useCallback(async () => {
        // Tách phần dữ liệu của đăng nhập và đăng ký ra
        const { firstname, lastname, mobile, ...data } = payload;

        const invalids = isRegister
            ? validate(payload, setInvalidFields)
            : validate(data, setInvalidFields);

        if (invalids === 0) {
            if (isRegister) {
                const response = await apiRegister(payload);

                if (response.success) {
                    setIsVerifyEmail(true);
                    // Swal.fire(
                    //     "Congratulation! ^_^",
                    //     response?.message,
                    //     "success"
                    // ).then(() => {
                    //     setIsRegister(false);
                    //     resetPayload();
                    // });
                } else {
                    Swal.fire("Oops!", response?.message, "error");
                    resetPayload();
                }
            } else if (isResetPassword) {
                const { email } = payload;
                const response = await apiForgotPassword({ email });

                if (response.success) {
                    Swal.fire(
                        "Congratulation! ^_^",
                        response?.message,
                        "success"
                    ).then(() => {
                        setIsResetPassword(false);
                        resetPayload();
                    });
                } else {
                    Swal.fire("Oops!", response?.message, "error");
                    resetPayload();
                }
            } else {
                const response = await apiLogin(data);
                if (response.success) {
                    Swal.fire(
                        "Congratulation! ^_^",
                        response?.message,
                        "success"
                    ).then(() => {
                        dispatch(
                            login({
                                isLoggedIn: true,
                                token: response.accessToken,
                                userData: response.userData,
                            })
                        );
                        navigate(`/${paths.HOME}`);
                    });
                } else {
                    Swal.fire(
                        "Email and password are not correct! Please try again!",
                        response?.message,
                        "error"
                    );
                    resetPayload();
                }
            }
        }
    }, [payload, isRegister, isResetPassword, navigate, dispatch]);

    const finalRegister = async () => {
        const response = await apiFinalRegister(token);
        if (response.success) {
            Swal.fire("Congratulation! ^_^", response?.message, "success").then(
                () => {
                    setIsRegister(false);
                    resetPayload();
                }
            );
        } else {
            Swal.fire("Oops!", response?.message, "error");
        }
        setIsVerifyEmail(false);
        setToken("");
    };

    return (
        <div className="grid grid-cols-3 relative">
            {isVerifyEmail && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-overplay z-10 flex justify-center items-center">
                    <div className="bg-white w-[500px] h-[200px] p-[30px]">
                        <div className="">
                            We sent a code to your email. Please check your mail
                            and enter your code:
                        </div>
                        <div className="flex items-center gap-[10px] mt-[20px]">
                            <input
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="w-full py-[10px] px-[20px] bg-[#f0f0f0] outline-none"
                            />
                            <button
                                onClick={finalRegister}
                                className="px-[20px] py-[10px] bg-main hover:opacity-80 text-white rounded-[3px]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white px-[20px]">
                <div className="uppercase font-semibold text-main text-[30px] w-full text-center mt-[100px] mb-[40px]">
                    {isRegister
                        ? "CREATE ACCOUNT"
                        : isResetPassword
                        ? "RESET YOUR PASSWORD"
                        : "LOGIN TO CONTINUE"}
                </div>
                <form className="w-full">
                    {isResetPassword && (
                        <div className="py-[10px] px-[15px] border-[1px] border-[#000] text-[15px] text-[#000] mb-[20px]">
                            We will send you an email to reset your password.
                        </div>
                    )}
                    {isRegister && (
                        <React.Fragment>
                            <div className="w-full grid grid-cols-2 gap-[15px]">
                                <InputField
                                    value={payload.firstname}
                                    nameKey="firstname"
                                    setValue={setPayload}
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                />
                                <InputField
                                    value={payload.lastname}
                                    nameKey="lastname"
                                    setValue={setPayload}
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                />
                            </div>
                            <InputField
                                value={payload.mobile}
                                nameKey="mobile"
                                setValue={setPayload}
                                type="mobile"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </React.Fragment>
                    )}
                    <InputField
                        value={payload.email}
                        nameKey="email"
                        setValue={setPayload}
                        type="email"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    {!isResetPassword && (
                        <InputField
                            value={payload.password}
                            nameKey="password"
                            setValue={setPayload}
                            type="password"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    )}
                    <Button
                        value={
                            isRegister
                                ? "CREATE"
                                : isResetPassword
                                ? "SUBMIT"
                                : "SIGN IN"
                        }
                        type="button"
                        wf={true}
                        handleOnClick={handleSubmit}
                    />
                    {!isRegister && !isResetPassword && (
                        <div className="flex items-center justify-between w-full">
                            <span
                                className="cursor-pointer text-[16px] text-black hover:text-main"
                                onClick={() => setIsResetPassword(true)}
                            >
                                Forgot your password?
                            </span>
                            <span
                                className="cursor-pointer text-[16px] text-black hover:text-main"
                                onClick={() => setIsRegister(true)}
                            >
                                Create Account
                            </span>
                        </div>
                    )}
                    {(isRegister || isResetPassword) && (
                        <Button
                            value="CANCEL"
                            type="button"
                            wf={false}
                            handleOnClick={() => {
                                setIsRegister(false);
                                setIsResetPassword(false);
                            }}
                        />
                    )}
                </form>
            </div>
            <div className="w-full h-screen col-span-2">
                <img
                    src="https://imatrix.com/wp-content/uploads/sites/12/2021/03/ecommerce.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Login;

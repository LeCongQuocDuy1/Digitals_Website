import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/";
import Swal from "sweetalert2";
import paths from "../../ultils/paths";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token });
        if (response.success) {
            Swal.fire("Congratulation! ^_^", response?.message, "success").then(
                () => {
                    navigate(`/${paths.LOGIN}`);
                }
            );
        } else {
            Swal.fire("Oops!", response?.message, "error");
        }
    };

    return (
        <div className="w-[440px] text-center m-auto mt-[30px] mb-[50px]">
            <div className="text-[25px] font-[600] text-[#000] mb-[5px]">
                Reset account password
            </div>
            <div className="text-[15px] text-[#000] mb-[15px]">
                Enter a new password for duy123@gmail.com
            </div>
            <div className="w-[50px] h-[1px] bg-[#000] m-auto"></div>

            <form className="w-full mt-[65px] m-auto">
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="outline-none placeholder:capitalize w-full text-[16px] placeholder:text-[#afb0b0] text-[#000] bg-[#eff2f2] py-[10px] px-[15px] mb-[20px]"
                />
                <Button
                    value={"RESET PASSWORD"}
                    type="button"
                    wf={true}
                    handleOnClick={handleResetPassword}
                />
            </form>
        </div>
    );
};

export default ResetPassword;

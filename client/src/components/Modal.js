import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../store/app/appSlice";

const Modal = ({ children }) => {
    const dispatch = useDispatch({});

    return (
        <div
            onClick={() =>
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
            }
            className="absolute inset-0 bg-overplay z-50"
        >
            {children}
        </div>
    );
};

export default Modal;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import paths from "./ultils/paths";
import {
    Login,
    Home,
    Public,
    Contact,
    Products,
    Blogs,
    About,
    Service,
    FAQ,
    DetailProduct,
    FinalRegister,
    ResetPassword,
} from "./pages/public/";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./components";

function App() {
    const dispatch = useDispatch();
    const { isShowModal, modalChildren } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="font-main relative">
            {isShowModal && <Modal>{modalChildren}</Modal>}
            <Routes>
                <Route path={paths.PUBLIC} element={<Public />}>
                    <Route path={paths.HOME} element={<Home />} />
                    <Route path={paths.CONTACT_US} element={<Contact />} />
                    <Route path={paths.PRODUCTS} element={<Products />} />
                    <Route path={paths.BLOGS} element={<Blogs />} />
                    <Route path={paths.ABOUT_US} element={<About />} />
                    <Route path={paths.OUR_SERVICES} element={<Service />} />
                    <Route path={paths.FAQS} element={<FAQ />} />

                    <Route
                        path={paths.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
                        element={<DetailProduct />}
                    />
                    <Route
                        path={paths.RESET_PASSWORD}
                        element={<ResetPassword />}
                    />
                </Route>
                <Route
                    path={paths.FINAL_REGISTER}
                    element={<FinalRegister />}
                />
                <Route path={paths.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;

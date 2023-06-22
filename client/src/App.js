import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import paths from "./ultils/paths";
import { Login, Home, Public ,Contact} from "./pages/public/";
import { getCategories } from "./store/asyncAction";
import { useDispatch } from "react-redux"; 

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="font-main">
            <Routes>
                <Route path={paths.PUBLIC} element={<Public />}>
                    <Route path={paths.HOME} element={<Home />} />
                    <Route path={paths.LOGIN} element={<Login />} />
                    <Route path={paths.CONTACT_US} element={<Contact />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

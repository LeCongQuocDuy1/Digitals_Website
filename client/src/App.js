import React from "react";
import { Routes, Route } from "react-router-dom";
import paths from "./ultils/paths";
import { Login, Home, Public } from "./pages/public/";

function App() {
    return (
        <div className="font-main">
            <Routes>
                <Route path={paths.PUBLIC} element={<Public />}>
                    <Route path={paths.HOME} element={<Home />} />
                    <Route path={paths.LOGIN} element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

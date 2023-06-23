import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
    },
});

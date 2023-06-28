import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action (Promise pending)
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });

        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });

        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        categories: null,
        isLoading: false,
        isShowModal: false,
        modalChildren: null,
    },
    reducers: {
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal;
            state.modalChildren = action.payload.modalChildren;
        },
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action (Promise pending)
        // builder.addCase(login.pending, (state) => {
        //     // Bật trạng thái loading
        //     state.isLoading = true;
        // });

        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

export const { showModal } = appSlice.actions;

export default appSlice.reducer;

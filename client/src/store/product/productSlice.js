import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        newProducts: null,
        errorMessage: "",
    },
    reducers: {
        // logout: (state) => {
        //     state.isLoading = false;
        // },
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action (Promise pending)
        // builder.addCase(login.pending, (state) => {
        //     // Bật trạng thái loading
        //     state.isLoading = true;
        // });

        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export default productSlice.reducer;

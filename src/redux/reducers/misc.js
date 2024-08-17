import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenPost: false
};

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsOpenPost: (state, action) => {
            state.isOpenPost = action.payload;
        },
    },
});

export default miscSlice;
export const { setIsOpenPost } = miscSlice.actions;
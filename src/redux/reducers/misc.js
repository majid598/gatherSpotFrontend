import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenPost: false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
};

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsOpenPost: (state, action) => {
            state.isOpenPost = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
    },
});

export default miscSlice;
export const { setIsOpenPost, setIsDeleteMenu, setIsFileMenu, setUploadingLoader } = miscSlice.actions;
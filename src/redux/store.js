import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authSlice from "./reducers/userReducer";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});
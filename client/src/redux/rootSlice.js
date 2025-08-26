import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portofolioData: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    SetPortofolioData: (state, action) => {
      state.portofolioData = action.payload;
    },
    SetUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    Logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetPortofolioData, SetUser, Logout } =
  rootSlice.actions;

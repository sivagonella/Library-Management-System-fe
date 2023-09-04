import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: false, userRole: "" },
    reducers: {
        login(state, action) {

        },
        logout(state) {

        }
    }
})
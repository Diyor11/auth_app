import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authServices";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// --------- login user ----------
export const login = createAsyncThunk('auth/login', async(user, thunkApi) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkApi().rejectWithValue(message)
    }
})
// --------- logout user ----------
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading= false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    signupData: null,
    loading: false
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, value){
            state.token = value.payload;
        },
        setSignUpForm(state, value){
            state.signupData = value.payload
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    }
})  
export const {setToken, setSignUpForm, setLoading} = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

const initialData = {
    token: localStorage.getItem('token')
}
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialData,
    reducers: {
        sesionIniciada: (state, action) => {
            const token = action.payload;
            state.token = token
            localStorage.setItem('token', token);
        },
        sesionCerrada: (state) => {
            state.token = null
            localStorage.removeItem('token');
        }
    }
});
export const { sesionIniciada, sesionCerrada } = loginSlice.actions;

export default loginSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}
export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {}
})

export const { } = basketSlice.actions


export default basketSlice.reducer

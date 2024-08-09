/* eslint-disable no-empty-pattern */
import { createSlice } from '@reduxjs/toolkit'
const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}
const initialState = {
    products: getBasketFromStorage(),
}
const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
}


export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                findProduct.count += action.payload.count;
            } else {
                state.products.push(action.payload);
            }
            writeFromBasketToStorage(state.products);
        }
    }
})

export const { addToBasket } = basketSlice.actions


export default basketSlice.reducer

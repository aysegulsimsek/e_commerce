import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    filteredProducts: []
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        filterProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter((product) => {
                const title = product.title ? product.title.toLowerCase() : '';
                return title.includes(searchTerm);
            });
        }
    }
});

export const { setProduct, filterProducts } = appSlice.actions;

export default appSlice.reducer;

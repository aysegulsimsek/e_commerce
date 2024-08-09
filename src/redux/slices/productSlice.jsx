import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}
const BASE_URL = "https://dummyjson.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log(response)

    return response.data.products;
});

export const getProductDetail = createAsyncThunk("getProductDetail", async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data.products;
});


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            state.loading = true; // Reset loading state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })


    }
});
export const { setLoading, setSelectedProduct, clearSelectedProduct } = productSlice.actions


export default productSlice.reducer
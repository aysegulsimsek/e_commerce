import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    filteredProducts: []
}
const BASE_URL = "https://dummyjson.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`);

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
            state.loading = true;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        filterProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter((product) => {
                const title = product.title ? product.title.toLowerCase() : '';
                return title.includes(searchTerm);
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.filteredProducts = action.payload;
        })


    }
});
export const { setLoading, setSelectedProduct, clearSelectedProduct, setProducts, filterProducts } = productSlice.actions


export default productSlice.reducer
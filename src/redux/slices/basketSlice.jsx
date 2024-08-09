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
    drawer: false,
    estimatedDelivery: '',

}
const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
}
function getDeliveryTimeScore(deliveryTime) {
    switch (deliveryTime) {
        case 'Ships in 1 month':
            return 30;
        case 'Ships in 1 weeks':
            return 7;
        case 'Ships in 2 weeks':
            return 14;
        case 'Ships in 1-2 business days':
            return 2;
        case 'Ships overnight':
            return 1;
        case 'Ships in 3-5 business days':
            return 5;
        default:
            return 0;
    }
}





export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                findProduct.count += action.payload.count;
                findProduct.image = action.payload.image;
                findProduct.shippingInformation = action.payload.shippingInformation;
            } else {
                state.products.push(action.payload);
            }
            writeFromBasketToStorage(state.products);
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer
        },
        calculateEstimatedDelivery(state) {
            if (state.products.length === 0) {
                state.estimatedDelivery = "No products in cart";
                return;
            }

            let maxScore = 0;
            let estimatedDelivery = '';

            state.products.forEach(product => {
                const score = getDeliveryTimeScore(product.shippingInformation);
                if (score > maxScore) {
                    maxScore = score;
                    estimatedDelivery = product.shippingInformation;
                }
            });


            state.estimatedDelivery = `${estimatedDelivery}`;
        }


    }
})

export const { addToBasket, setDrawer, calculateEstimatedDelivery } = basketSlice.actions


export default basketSlice.reducer

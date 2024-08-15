/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import { filterProducts } from '../redux/slices/appSlice';
import Product from './Product';

function FilteredProducts() {
    const dispatch = useDispatch();
    const products = useSelector((store) => store.product.products);
    const filteredProducts = useSelector((store) => store.app.filteredProducts);
    const searchTerm = ''; // Bu, input'tan veya başka bir kaynaktan gelen arama terimi olabilir

    useEffect(() => {
        dispatch(getAllProducts());
        if (searchTerm) {
            dispatch(filterProducts(searchTerm));
        }
    }, [dispatch, searchTerm]);




    return (
        <div className='flex-row' style={{ flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
            {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <div>No products available</div>
            )}
        </div>
    );
}

export default FilteredProducts



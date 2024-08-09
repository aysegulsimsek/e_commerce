/* eslint-disable react/prop-types */
import React from 'react';
import '../css/Product.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, thumbnail, title, category, brand, availabilityStatus, reviews, shippingInformation } = product;

    const navigate = useNavigate();

    return (
        <div className='card' style={{ backgroundColor: '#fff', color: '#000' }}>
            <strong> {brand}</strong>
            {thumbnail && thumbnail.length > 0 && (
                <img className='product_image' src={thumbnail} alt={title} />
            )}
            <h3 style={{ display: 'flex', height: '50px', alignItems: 'center', justifyContent: 'center' }}>{title}</h3>
            <i style={{ display: 'flex', height: '10px', alignItems: 'center', justifyContent: 'center', marginBottom: '.5rem' }}>{shippingInformation}</i>
            <strong><i className='price_product'>{price} $</i></strong>
            <div>
                <button onClick={() => { navigate("/product-details/" + id) }} className='details_button'>Details</button>
            </div>
        </div>
    );
}

export default Product;

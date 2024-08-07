import React from 'react'
import '../css/Product.css'
import '../App.css'
import { useNavigate } from 'react-router-dom';
function Product({ product }) {

    const { id, price, image, title, category, rating } = product;

    const navigate = useNavigate();
    return (

        <div className='card' style={{ backgroundColor: '#fff', color: '#000' }}>
            <p>Category :{category} </p>
            <img className='product_image' src={image} alt={title} />
            <h3 style={{ display: 'flex', height: '80px', alignItems: 'center', justifyContent: 'center' }}>{title}</h3>
            <strong><i className='price_product'>{price} $</i></strong>
            <div>
                <button onClick={() => { navigate("/product-details/" + id) }} className='details_button'>Details</button>
            </div>
        </div>

    )
}
export default Product
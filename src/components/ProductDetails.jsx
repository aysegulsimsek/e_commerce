/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { BsAwardFill, BsSuitHeart } from 'react-icons/bs';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import Loading from './Loading';
import axios from 'axios';
import '../css/ProductDetails.css';
import SameCategory from './SameCategory';
import Comments from './Comments';
import { addToBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);
    const [ranking, setRanking] = useState(null);
    const loading = useSelector((state) => state.product.loading);
    const productDetail = useSelector((state) => state.product.selectedProduct);

    // Fetch product details
    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                dispatch(setSelectedProduct(response.data));
                fetchCategoryProducts(response.data.category, response.data.id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch, id]);

    const fetchCategoryProducts = (category, currentProductId) => {
        axios
            .get(`https://dummyjson.com/products/category/${category}`)
            .then((response) => {
                const products = response.data.products;
                // Sort products by rating value
                products.sort((a, b) => b.rating - a.rating);
                // Find the rank of the current product
                const rank = products.findIndex(product => product.id === currentProductId) + 1;
                setRanking(rank);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1 >= 0 ? count - 1 : 0);
    };

    const addBasket = () => {
        const payload = {
            id,
            price: productDetail.price,
            thumbnail: productDetail.thumbnail,  // Eklediğiniz görüntünün ne olduğuna dikkat edin
            title: productDetail.title,
            description: productDetail.description,
            shippingInformation: productDetail.shippingInformation,
            count
        };
        dispatch(addToBasket(payload));
    };




    if (loading || !productDetail) {
        return <Loading />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', marginTop: '50px', alignItems: 'center' }}>
                <div key={productDetail.id} reviews={productDetail.reviews}
                    className="flex-row details_card"
                    style={{

                        gap: '40px',
                        display: 'flex',
                        alignItems: 'start',
                        backgroundColor: '#fff',
                        color: '#000',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                        {productDetail.thumbnail && productDetail.thumbnail.length > 0 && (
                            <img src={productDetail.thumbnail} alt={productDetail.title} width={300} />
                        )}
                    </div>
                    <div style={{ padding: '0 3rem' }}>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <BsAwardFill style={{ color: 'gold' }} />
                            <p>&nbsp;</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                <strong>{productDetail.category}</strong>
                                <p>&nbsp;</p>
                                {ranking && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>kategorisinde en çok favorilenen </p>&nbsp;
                                        <i> {ranking}. ürün </i>
                                    </div>
                                )}

                            </div>

                        </div>
                        <div>
                            <i>{productDetail.shippingInformation} </i>

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p>
                                {productDetail.rating}{' '}
                                <ProductRating rating={productDetail.rating} />
                            </p>
                            <p style={{ marginLeft: '.5rem', fontSize: '12px' }} className='rate_product'>
                                ( {'  Son '} {productDetail.stock}  {'   ürün  ! '})
                            </p>
                        </div>

                        <h2 className="title">{productDetail.title}</h2>
                        <p className="description">{productDetail.description}</p>
                        <h1 className="price" style={{ color: '#f37919' }}>
                            {productDetail.price} $
                        </h1>

                        <div className="flex-row" style={{ justifyContent: 'flex-start', gap: '.5rem' }}>
                            <CiCirclePlus onClick={increment} style={{ fontSize: '30px' }} />{' '}
                            <span style={{ fontSize: '20px' }}>{count}</span>{' '}
                            <CiCircleMinus onClick={decrement} style={{ fontSize: '30px' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button onClick={addBasket} className="btn">Sepete Ekle</button>
                            <span className="span">
                                <BsSuitHeart className="icon" />
                            </span>
                        </div>
                    </div>

                </div>

            </div>
            <div>
                <Comments reviews={productDetail.reviews} />

            </div>
            <div>
                <SameCategory category={productDetail.category} currentProductId={productDetail.id} />

            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
const ProductRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Create full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} color="gold" />);
    }

    // Add half star if applicable
    if (hasHalfStar) {
        stars.push(
            <FontAwesomeIcon key={`half-${fullStars}`} icon={faStarHalfAlt} color="gold" />
        );
    }

    // Fill the rest with empty stars
    const totalStars = 5; // Assuming a 5-star rating system
    for (let i = stars.length; i < totalStars; i++) {
        stars.push(
            <FontAwesomeIcon key={`empty-${i}`} icon={faStarOutline} color="gold" />
        );
    }

    return <span>{stars}</span>;
};


export default ProductDetails;

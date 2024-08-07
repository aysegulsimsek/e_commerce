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
            .get(`https://fakestoreapi.com/products/${id}`)
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
            .get(`https://fakestoreapi.com/products/category/${category}`)
            .then((response) => {
                const products = response.data;
                // Sort products by rating count
                products.sort((a, b) => b.rating.count - a.rating.count);
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

    if (loading || !productDetail) {
        return <Loading />;
    }

    return (
        <div>
            <div
                className="flex-row details_card"
                style={{
                    marginTop: '50px',
                    gap: '40px',
                    display: 'flex',
                    alignItems: 'start',
                    backgroundColor: '#fff',
                    color: '#000',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <img src={productDetail?.image} alt="" width={300} />
                </div>
                <div style={{ padding: '0 3rem' }}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <BsAwardFill style={{ color: 'gold' }} />
                        <p>&nbsp;</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <strong>{productDetail?.category}</strong>
                            <p>&nbsp;</p>
                            {ranking && (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p>kategorisinde en çok favorilenen </p>&nbsp;
                                    <i> {ranking}. ürün </i>
                                </div>
                            )}

                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p>
                            {productDetail?.rating?.rate}{' '}
                            <ProductRating rating={productDetail?.rating?.rate} />

                        </p>
                        <p style={{ marginLeft: '.5rem', fontSize: '12px' }} className='rate_product'>
                            ( {productDetail?.rating?.count}{'  Yorum '})
                        </p>
                    </div>

                    <h2 className="title">{productDetail?.title}</h2>
                    <p className="description">{productDetail?.description}</p>
                    <h1 className="price" style={{ color: '#f37919' }}>
                        {productDetail?.price} $
                    </h1>

                    <div className="flex-row" style={{ justifyContent: 'flex-start', gap: '.5rem' }}>
                        <CiCirclePlus onClick={increment} style={{ fontSize: '30px' }} />{' '}
                        <span style={{ fontSize: '20px' }}>{count}</span>{' '}
                        <CiCircleMinus onClick={decrement} style={{ fontSize: '30px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="btn">Sepete Ekle</button>
                        <span className="span">
                            <BsSuitHeart className="icon" />
                        </span>
                    </div>
                </div>
            </div>
            <SameCategory category={productDetail?.category} currentProductId={productDetail?.id} />
        </div>
    );

}

// eslint-disable-next-line react/prop-types
const ProductRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Calculate full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there is a half star

    // Create full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="gold" />);
    }

    // Add half star if applicable
    if (hasHalfStar) {
        stars.push(
            <FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} color="gold" />
        );
    }

    // Fill the rest with empty stars
    const totalStars = 5; // Assuming a 5-star rating system
    for (let i = stars.length; i < totalStars; i++) {
        stars.push(
            <FontAwesomeIcon key={i} icon={faStarOutline} color="gold" />
        );
    }

    return <span>{stars}</span>;
};

export default ProductDetails;

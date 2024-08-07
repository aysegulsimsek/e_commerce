// SameCategory.jsx

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from './CustomArrows'; // Import custom arrows
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';
import '../css/ProductDetails.css'; // Ensure this path is correct
import { BsSuitHeart } from 'react-icons/bs';


// eslint-disable-next-line react/prop-types
function SameCategory({ category, currentProductId }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!category) return;

        axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then((response) => {
                const filteredProduct = response.data.filter((product) => product.id !== currentProductId);
                setRelatedProducts(filteredProduct);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [category, currentProductId]);

    if (loading) {
        return <Loading />;
    }

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="related_section">
            <h1 className="related_text">Benzer Ürünler</h1>
            <Slider {...sliderSettings} style={{ maxWidth: '100%', margin: '0 auto' }}>
                {relatedProducts.map((product) => (
                    <div
                        className="products_related"
                        key={product.id}
                        style={{ padding: '10px', textAlign: 'center', backgroundColor: '#fff' }}

                    >
                        <div className="product_related">
                            <span className="span_related">
                                <BsSuitHeart className="icon_related" />
                            </span>
                            <div style={{
                                padding: '2rem',
                                boxShadow: '0 0 2px rgba(0,0,0,0.2)',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                backgroundColor: '#fff'
                            }}>

                                <img onClick={() => { navigate("/product-details/" + product.id); }}
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        minHeight: '300px',
                                        objectFit: 'contain',
                                    }}
                                    className='related_img'
                                />
                            </div>
                            <h4
                                style={{
                                    fontSize: '.9rem',
                                    height: '10px',
                                    textOverflow: 'ellipsis',
                                    fontFamily: 'Arial',
                                    fontWeight: 'lighter',
                                }}
                            >
                                {product.title}
                            </h4>
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ fontSize: '16px', marginRight: '.5rem' }}>
                                        {product?.rating?.rate}{' '}
                                    </p>
                                    <ProductRating rating={product?.rating?.rate} />
                                    <p style={{ marginLeft: '.5rem', fontSize: '12px' }} className='rate_product'>
                                        ( {product?.rating?.count}{' '})
                                    </p>
                                </div>
                            </div>
                            <p style={{ color: '#f37919', fontWeight: 'bold', fontSize: '18px', marginTop: '-10px' }}>
                                {product.price} $
                            </p>
                        </div>
                    </div>
                ))
                }
            </Slider >
        </div >
    );
}

// eslint-disable-next-line react/prop-types
const ProductRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="gold" />);
    }

    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} color="gold" />);
    }

    const totalStars = 5;
    for (let i = stars.length; i < totalStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarOutline} color="gold" />);
    }

    return <span>{stars}</span>;
};

export default SameCategory;

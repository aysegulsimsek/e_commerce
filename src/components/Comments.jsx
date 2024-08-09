/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import '../css/ProductDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from './CustomArrows'; // Import custom arrows



function Comments({ reviews }) {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
        <div>
            <h1 className="related_text" style={{ marginTop: '2rem' }}>Ürün Değerlendirmeleri</h1>

            <div className='comment_card'>
                <Slider {...sliderSettings} style={{ maxWidth: '100%', margin: ' auto' }}>
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className='comment_product_card'>
                                <p>
                                    {review.rating}{' '}
                                    <ProductRating rating={review.rating} />
                                </p>
                                <p><strong>{review.reviewerName}</strong> </p>

                                <p>{review.comment}</p>
                                <small>
                                    {new Date(review.date).toLocaleDateString()}
                                </small>
                            </div>
                        ))
                    ) : (
                        <p>Bu ürüne henüz yorum yapılmamış.İlk yorumu yapan sen ol !</p>
                    )}
                </Slider >

            </div>

        </div >
    );
}
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
export default Comments;



// eslint-disable-next-line no-unused-vars
import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';


const ArrowContainer = styled.div`
  align-items: center;
  border-radius: 100%;
  justify-content: center;
  font-size: 50px;
  color: #ddd;
  cursor: pointer;
  z-index: 2;
  position: absolute; 
  transition: all .3s;
  &:hover {
    color: #f09a59; 
  }
`;


const NextArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
        <ArrowContainer
            className={className}
            style={{
                ...style,
                right: '-30px',
                top: '40%'
            }}
            onClick={onClick}
        >
            <IoIosArrowForward />
        </ArrowContainer>
    );
};

const PrevArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
        <ArrowContainer
            className={className}
            style={{
                ...style,
                left: '-60px',
                top: '40%'
            }}
            onClick={onClick}
        >
            <IoIosArrowBack />
        </ArrowContainer>
    );
};

export { NextArrow, PrevArrow };

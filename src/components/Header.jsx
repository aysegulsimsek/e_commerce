// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import '../css/Header.css'
import { CiShoppingBasket, CiUser } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.webp';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import { filterProducts } from '../redux/slices/productSlice';

function Header() {
    const { products } = useSelector((store) => store.basket);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearchTerm = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(filterProducts(value)); // Dispatch the action to filter products
    };
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className='header'>
            <div className=' flex-row' style={{ cursor: 'pointer' }} onClick={() => { navigate("/") }}>
                <img className='logo' src={logo} alt="Aysegul A.Ş" />
                <p className='logo-text'>Aysegul A.Ş</p>
            </div>

            <div className='flex-row' style={{ gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                <input
                    className='search-input'
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTerm}
                    placeholder='search...'
                />

                <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="primary">
                    <CiShoppingBasket style={{ fontSize: '30px' }} />
                </Badge>
                <div className='flex-row' style={{ fontSize: '28px' }}>
                    <CiUser />
                </div>
            </div>
        </div>
    )
}

export default Header
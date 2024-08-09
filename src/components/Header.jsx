// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import '../css/Header.css'
import { CiShoppingBasket, CiUser } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.webp';
import Badge from '@mui/material/Badge';

function Header() {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className='header'>
            <div className=' flex-row' style={{ cursor: 'pointer' }} onClick={() => { navigate("/") }}>
                <img className='logo' src={logo} alt="Aysegul A.Ş" />
                <p className='logo-text'>Aysegul A.Ş</p>
            </div>

            <div className='flex-row' style={{ gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                <input className='search-input' type="text" placeholder='search...' />

                <Badge badgeContent={4} color="primary">
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
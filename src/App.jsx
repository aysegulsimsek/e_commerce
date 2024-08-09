/* eslint-disable react/jsx-no-undef */
import './App.css'
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setDrawer, calculateEstimatedDelivery } from './redux/slices/basketSlice';
import { useEffect } from 'react';


function App() {
  const { products, drawer, estimatedDelivery } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  function calculateTotalPrice(price, count) {
    return price * count;
  }
  const totalItems = products.reduce((sum, product) => sum + product.count, 0);
  const totalPrice = products.reduce((sum, product) => sum + calculateTotalPrice(product.price, product.count), 0);
  useEffect(() => {
    dispatch(calculateEstimatedDelivery());
  }, [products, dispatch]);




  return (
    <div>
      <Header />

      <PageContainer>
        <Loading />


        <RouterConfig />
        <Drawer anchor='right' open={drawer} className='basket_section' sx={{ backgroundColor: 'transparent' }}>
          <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
            <h2 style={{ margin: '1rem auto' }}>Sepetim</h2>
            <IoIosCloseCircleOutline onClick={() => dispatch(setDrawer())} style={{ fontSize: '24px', cursor: 'pointer' }} />
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '8px', textAlign: 'left', width: '80px' }}>Ürün</th>
                <th style={{ padding: '8px', textAlign: 'left', width: '100px' }}>Ürün Adı</th>
                <th style={{ padding: '8px', textAlign: 'center', width: '80px' }}>Fiyat</th>
                <th style={{ padding: '8px', textAlign: 'center', width: '80px' }}>Miktar</th>
                <th style={{ padding: '8px', textAlign: 'center', width: '100px' }}>Toplam</th>
                <th style={{ padding: '8px', textAlign: 'center', width: '100px' }}>İşlem</th>
              </tr>
            </thead>

            <tbody>
              {products && products.map((product) => (
                <tr key={product.id}>
                  <td style={{ padding: '8px', textAlign: 'left' }}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: '80px', height: 'auto' }}
                    />
                  </td>
                  <td style={{ width: '100px', padding: '8px', textAlign: 'left', wordWrap: 'break-word' }}>{product.title}</td>
                  <td style={{ width: '80px', padding: '8px', textAlign: 'center' }}>{product.price} $</td>
                  <td style={{ width: '80px', padding: '8px', textAlign: 'center' }}>{product.count} adet</td>
                  <td style={{ width: '100px', padding: '8px', textAlign: 'center' }}>
                    <strong style={{ fontSize: '14px' }}>
                      <i>{calculateTotalPrice(product.price, product.count)} $</i>
                    </strong>
                  </td>
                  <td style={{ width: '100px', padding: '8px', textAlign: 'center' }}>
                    <button
                      style={{
                        fontSize: '12px',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '5px 10px',
                        backgroundColor: '#f37919',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Sepetten Çıkar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', borderTop: '1px solid #ddd', justifyContent: 'space-between', padding: '1rem 2rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: 'auto', marginRight: '0', justifyContent: 'space-evenly' }} >
              <div style={{ display: 'flex', width: '100%', padding: '0 1rem', marginLeft: 'auto', marginRight: '0', gap: '1.5rem', justifyContent: 'space-evenly', marginTop: '-1rem' }}>
                <h4>Tahmini Teslimat</h4>
                <h4>Toplam Ürün</h4>
                <h4>Toplam Tutar</h4>
              </div>
              <div style={{ display: 'flex', width: '100%', padding: '0 1rem', marginTop: '-1.5rem', marginLeft: 'auto', marginRight: '0', gap: '3rem', justifyContent: 'space-evenly' }}>
                <p>{estimatedDelivery}</p>
                <p>{totalItems}</p>
                <p> {totalPrice.toFixed(2)} $</p>
              </div>
            </div>
            <div>
              <button style={{
                fontSize: '16px',
                border: 'none',
                borderRadius: '2px',
                padding: '.5rem 1rem',
                backgroundColor: '#199cf3',
                color: '#fff',
                cursor: 'pointer'
              }} >
                Ödeme
              </button>
            </div>
          </div>
        </Drawer>



      </PageContainer>
    </div >
  )
}

export default App

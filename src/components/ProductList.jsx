import react from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';

function ProductList() {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <div className='flex-row' style={{ flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
            {
                products && products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <div>No products available</div>
                )
            }
        </div>
    )
}

export default ProductList
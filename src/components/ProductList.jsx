
// eslint-disable-next-line no-unused-vars
import react from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';

function ProductList() {
    const dispatch = useDispatch();
    const { filteredProducts, loading } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='flex-row' style={{ flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
            {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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

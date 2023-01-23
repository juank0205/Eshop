import axios from 'axios';
import { useState, useEffect } from 'react';
import Product from './product.jsx';

const URI = 'http://localhost:8000/products/'

const CompShowProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
        }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        setProducts(res.data);
    }

    return (
        <>
            <div className="lista-productos">
                {
                    products.map(product =>
                        <Product 
                            key={product.id}
                            name={product.name}
                            details={product.details}
                            price={product.price}
                            imageName={product.imgName}
                            image={product.image}
                        />
                    )
                }
            </div>
        </>
    )
}

export default CompShowProducts;
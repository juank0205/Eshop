import axios from 'axios';
import { useState, useEffect } from 'react';
import Product from './product.jsx';
import '../../stylesheets/showProduct.css'

const URI = 'http://localhost:8000/products/';

const CompShowProducts = () => {

    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        const resImage = await axios.get(URI + 'image/');
        setProducts(res.data);
        setImages(resImage.data);
    }


    return (
        <>
            <div className="lista-productos">
                {
                    products.map(product =>
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={images[product.id]}
                        />
                    )
                }
            </div>
        </>
    )
}

export default CompShowProducts;
import axios from 'axios';
import { useState, useEffect } from 'react';
import Product from './product.jsx';
import '../stylesheets/showProduct.css'

const URI = 'http://localhost:8000/products/';

const CompShowProducts = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        setProducts(res.data);
    }

    const getImageURL = async id => {
        const res = await axios.get(URI + 'image/' + id);
        console.log(res.data);
        const resImage = await axios.get(URI + 'image/url',
            {
                params: {
                    url: res.data
                }
            })
        return resImage.data;
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
                            image={getImageURL(product.id)}
                        />
                    )
                }
            </div>
        </>
    )
}

export default CompShowProducts;
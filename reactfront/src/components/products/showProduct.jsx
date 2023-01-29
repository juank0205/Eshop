import axios from 'axios';
import { useState, useEffect } from 'react';
import Product from './product.jsx';
import '../../stylesheets/showProduct.css'

const URI = 'http://localhost:8000/products/';

const CompShowProducts = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        const resImage = await axios.get(URI + 'image/');
        let response = [];
        for(let i=0; i<res.data.length; i++){
            response.push({info: res.data[i], image: resImage.data[i]})
        }
        setProducts(response);
    }


    return (
        <>
            <div className="lista-productos">
                {
                    products.map(product =>
                        <Product
                            key={product.info.id}
                            id={product.info.id}
                            name={product.info.name}
                            details={product.info.details}
                            price={product.info.price}
                            // imageName={product.imgName}
                            image={product.image}
                        />
                    )
                }
            </div>
        </>
    )
}

export default CompShowProducts;
import axios from 'axios';

//Hooks y contextos
import { useState, useEffect } from 'react';
import Product from './product.jsx';

//Estilos
import '../../stylesheets/showProduct.css'

const URI = 'https://eshop-ynv8.onrender.com/products/';

const CompShowProducts = () => {
    //Hook para almacenar los datos de los productos y sus imagenes
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    //Llamar las peticiones
    useEffect(() => {
        getProducts()
    }, []);

    //Definicion de las peticiones y asignacion de los hooks
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
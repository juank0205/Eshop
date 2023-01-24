import axios from "axios";
import Bought from "./productBought";
import { useState, useEffect } from "react";
import '../stylesheets/carrito.css';

export let boughtArray = [];
export const buy = id => {
    boughtArray.push(id);
    console.log(boughtArray);
}

const URI = 'http://192.168.39.176:8000/products/';

function Carrito() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI);
        const resImage = await axios.get(URI + 'image/');
        let response = [];
        for (let i = 0; i < res.data.length; i++) {
            response.push({ info: res.data[i], image: resImage.data[i] })
        }

        const bought = [];
        boughtArray.map(product => bought.push(response[product-1]));
        console.log(bought);
        setProducts(bought);
    }


    return (
        <>
            <div className="contenedor-compra-carrito">
                {
                    products.map((product, index) =>
                        <Bought
                            key={index}
                            id={product.info.id}
                            name={product.info.name}
                            price={product.info.price}
                            image={product.image}
                        />
                    )
                }
            </div>
        </>
    )
}

export default Carrito;
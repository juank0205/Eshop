import axios from "axios";
import Bought from "./productBought";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../stylesheets/carrito.css';

export let boughtObj = {};

export const buy = id => {
    if (boughtObj.hasOwnProperty(id)) {
        boughtObj[id]++;
    } else {
        boughtObj[id] = 1;
    }
   return boughtObj;
}

export const deleteBought = id => {
    if (boughtObj[id] == 0) return;
    boughtObj[id]--;
    if (boughtObj[id] == 0) {
        delete boughtObj[id];
    }
    return boughtObj;
}


const URI = 'http://localhost:8000/products/';

function Carrito() {

    const [quantity, setQuantity] = useState([]);
    useEffect(() => {
        setQuantity(boughtObj);
    }, [boughtObj]);

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
        Object.keys(boughtObj).map(id => bought.push(response[id - 1]));
        setProducts(bought);
    }

    const updateComponent = () => {
        setQuantity(boughtObj);
    }


    return (
        <>
            <div className="contenedor-compra-carrito">
                {
                    products.map((product, index) =>
                        <div className="bought" key={index}>
                            <Bought
                                key={index+'bought'}
                                id={product.info.id}
                                name={product.info.name}
                                price={product.info.price}
                                quantity={quantity[product.info.id]}
                                image={product.image}
                            />
                            <div className="delete-add" key={index+'add'}>
                                <button key={index+'add'} onClick={() => {
                                    deleteBought(product.info.id);
                                    updateComponent();
                                }} className="delete">-</button>
                                <button key={index+'delete'} onClick={() => {
                                    buy(product.info.id);
                                    updateComponent();
                                }} className="add">+</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Carrito;
import axios from "axios";
import Bought from "./products/productBought";
import { useState } from "react";
import '../stylesheets/carrito.css';
import useCart from "./hooks/useCart";
import { useEffect } from "react";
import { priceText } from "../App";

const URI = 'http://localhost:8000/products/';

function Carrito() {
    const cart = useCart();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [cart])

    const getProducts = async () => {
        const res = await axios.get(URI);
        const resImage = await axios.get(URI + 'image/');
        let response = [];
        for (let i = 0; i < res.data.length; i++) {
            response.push({ info: res.data[i], image: resImage.data[i] })
        }
        const bought = [];
        Object.keys(cart.boughtObj).map(id => bought.push(response[id - 1]));
        setProducts(bought);
    }

    const handleClickBuy = id => {
        cart.boughtObj.hasOwnProperty(id) ? cart.boughtObj[id]++ : cart.boughtObj[id] = 1;
        cart.setBoughtObj({ ...cart.boughtObj });
    }

    const handleClickDelete = id => {
        cart.boughtObj[id]--;
        cart.boughtObj[id] === 0 ? delete cart.boughtObj[id] : void(0);
        cart.setBoughtObj({ ...cart.boughtObj });
    }

    let subTotal = 0;

    return (
        <>
            <div className="contenedor-compra-carrito">
                <div className="top-cart">
                    <div className="contenedor-imagen-comprado"></div>
                    <div className="contenedor-producto-comprado"> NAME</div>
                    <div className="contenedor-cantidad-comprado"> QUANTITY</div>
                    <div className="contenedor-precio-comprado"> PRICE</div>
                </div>
                <div className="division"></div>
                {
                    products.map((product, index) => {
                        subTotal += product.info.price*cart.boughtObj[product.info.id];
                        return(
                            <div className="cart-container">
                                <div className="bought" key={index}>
                                    <Bought
                                        key={index + 'bought'}
                                        id={product.info.id}
                                        name={product.info.name}
                                        price={product.info.price}
                                        quantity={cart.boughtObj[product.info.id]}
                                        image={product.image}
                                        handleBuy={handleClickBuy}
                                        handleDelete={handleClickDelete}
                                    />
                                </div>
                            </div>

                        )
                    }
                    )
                }
                <div className="division"></div>
                <div className="contenedor-subtotal">
                    <div className="texto-subtotal">TOTAL:  </div>
                    <div className="subtotal">{priceText(subTotal)}</div>
                </div>
            </div>
        </>
    )
}

export default Carrito;
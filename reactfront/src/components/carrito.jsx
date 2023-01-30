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
    const [images, setImages] = useState([]);
    useEffect(() => {
        getProducts();
    }, [cart])

    const getProducts = async () => {
        const res = await axios.get(URI);
        const resImage = await axios.get(URI + 'image');
        let bought = [];
        Object.keys(cart.boughtObj).map(id => bought.push(res.data[id - 1]));
        setProducts(bought);
        setImages(resImage.data);
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

    const Checkout = async e => {
        e.preventDefault();
        await axios.put(URI + 'buy', cart.boughtObj)
        .then(({data}) => {
            alert(data);
        }).catch(error => {
            alert(error);
        })
        window.location.href = '/';
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
                        subTotal += product.price*cart.boughtObj[product.id];
                        return(
                            <div className="cart-container" key={index+'-container'}>
                                <div className="bought" key={index}>
                                    <Bought
                                        key={index + 'bought'}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        quantity={cart.boughtObj[product.id]}
                                        image={images[product.id]}
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
                    <div className="text-subtotal">TOTAL:  </div>
                    <div className="subtotal">{priceText(subTotal)}</div>
                    <div className="spacer"></div>
                    <button className="buy-button" onClick={Checkout}>BUY</button>
                </div>
            </div>
        </>
    )
}

export default Carrito;
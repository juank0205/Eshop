import axios from "axios"; //Importar axios 
import Bought from "../products/productBought"; //Componente de producto dentro del carrito

//Hooks y contextos
import { useState, useEffect } from "react";
import useCart from "../hooks/useCart";

//Estilos
import '../../stylesheets/carrito.css';
import { priceText } from "../../App";

const URI = 'https://eshop-ynv8.onrender.com/products';

//Componente
function Carrito() {
    const cart = useCart(); //Utilizar el contexto de carrito
    const [products, setProducts] = useState([]); //Hook para almacenar los productos de la base de datos
    const [images, setImages] = useState([]); //Hook para almacenar las imagenes de la base de datos
    const [hasRendered, setHasRendered] = useState(false); //Hook para controlar cuntos botones de mercado pago salen

    //Cargar los productos
    useEffect(() => {
        getProducts();
    }, [cart])


    //Funcionalidad de mercadopago
    const fetchCheckout = async () => {
        await axios.post(URI + '/buy', cart.boughtObj)
            .then(({ data }) => {
                //Tomar el id generado desde el servidor y utilizar el token publico
                document.getElementById('mercado-pago-id').setAttribute('data-preference-id', data.preferenceId);
                const mp = new window.MercadoPago('TEST-60491e71-6caf-48f1-ab50-a0a1f2b1aca4', {
                    locale: 'es-CO'
                })

                //Renderizar el boton en el contenedor con la clase 'cho-container'
                mp.checkout({
                    preference: {
                        id: data.preferenceId
                    },
                    render: {
                        container: '.cho-container',
                        label: 'Checkout',
                    }
                });

            }).catch(error => {
                alert(error);
            })
    }

    //Peticion para obtener los productos y las imagenes del servidor y almacenarlos en un hook
    const getProducts = async () => {
        //Peticiones con axios
        const res = await axios.get(URI);
        const resImage = await axios.get(URI + '/image');

        //Organizar la informacion en un arreglo 
        let bought = [];
        Object.keys(cart.boughtObj).map(id => bought.push(res.data[id - 1]));
        setProducts(bought);
        setImages(resImage.data);
    }

    //Funcion para cambiar el contador del carrito utilizando el contexto del carro (reservar)
    const handleClickBuy = id => {
        cart.boughtObj.hasOwnProperty(id) ? cart.boughtObj[id]++ : cart.boughtObj[id] = 1;
        cart.setBoughtObj({ ...cart.boughtObj });
    }
    
    //Funcion para cambiar el contador del carrito utilizando el contexto del carro (reservar)
    const handleClickDelete = id => {
        cart.boughtObj[id]--;
        cart.boughtObj[id] === 0 ? delete cart.boughtObj[id] : void (0);
        cart.setBoughtObj({ ...cart.boughtObj });
    }

    //Aparecer el boton de mercadopago
    const buyClick = () => {
        if (hasRendered) return;
        fetchCheckout();
        setHasRendered(true);
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
                        subTotal += product.price * cart.boughtObj[product.id];
                        return (
                            <div className="cart-container" key={index + '-container'}>
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
                    <button onClick={buyClick}>Checkout</button>
                    <div className="cho-container" disabled={hasRendered}></div>
                </div>
            </div>
        </>
    )
}

export default Carrito;
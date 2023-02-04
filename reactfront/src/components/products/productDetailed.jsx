import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";

//Hooks y contextos
import { useState, useEffect } from "react";
import useUser from '../hooks/UseUser';
import useCart from "../hooks/useCart";

//Estilos
import ImageSlider, { Slide } from "react-auto-image-slider";
import { priceText } from "../../App";
import '../../stylesheets/productDetailed.css'

const URL = 'https://eshop-ynv8.onrender.com/products'
const URLBook = 'https://eshop-ynv8.onrender.com/products/book/'

function ProductDetail() {
    //Definir los contextos de carrito y usuario
    const user = useUser();
    const cart = useCart();

    //Obtener el id mediante la url actual
    const dato = useLocation().pathname.split('/')[2];

    //Obtener las imagenes y la informacion del producto
    const [hasBought, setHasBought] = useState(false);
    const [images, setImages] = useState([]);
    const [productoDetalle, setProductoDetalle] = useState({ info: { name: '', price: 0, details: '' }, imagen: '' })

    //Llamar la peticion del servidor
    useEffect(() => {
        //Obtener datos de producto y de imagenes
        const getProductoDetalle = async () => {
            const res = await axios.get(URL + '/' + dato);
            const resImage = await axios.get(URL + '/image/' + dato);
            setProductoDetalle(res.data);
            setImages(resImage.data[dato]);
        }

        getProductoDetalle();
    }, [dato]);


    //Manejar la reserva segun la respuesta de la peticion
    const handleClick = async () => {
        const res = await axios.get(URLBook + dato + '?f=book');
        console.log(res.data);
        if (res.data === 'Stockout') return alert('Item out of stock');
        if (res.data === 'Booked') {
            cart.boughtObj.hasOwnProperty(productoDetalle.id) ? cart.boughtObj[productoDetalle.id]++ : cart.boughtObj[productoDetalle.id] = 1;
            cart.setBoughtObj({ ...cart.boughtObj });
            setHasBought(true);
        }
    }

    //Si el usuario ya le dio click al boton, revisa si ya inicio sesion
    if (hasBought) {
        if (user.auth) {
            return <Navigate to={'/cart'} />
        }
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <div className="contenedor-producto-detalle">
                <div className="contenedor-imagen-detalle">
                    <div className="slider">
                        <ImageSlider effectDelay={1000} autoPlayDelay={2000}>
                            <Slide>
                                <img alt="img2" src={images[0]} />
                            </Slide>
                            <Slide>
                                <img alt="img2" src={images[1]} />
                            </Slide>
                            <Slide>
                                <img alt="img1" src={images[2]} />
                            </Slide>
                        </ImageSlider>
                    </div>
                </div>
                <div className="contenedor-detalles-detalle">
                    <h1 className="contenedor-titulo-detalle">
                        {productoDetalle.name}
                    </h1>
                    <h2 className="contenedor-precio-detalle">
                        {priceText(productoDetalle.price)}
                    </h2>
                    <p className="contenedor-texto-detalle">
                        {productoDetalle.details}
                    </p>
                    <button onClick={handleClick} className="buy">BUY</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;
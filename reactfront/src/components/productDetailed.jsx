import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useUser from './hooks/UseUser';
import useCart from "./hooks/useCart";
import { priceText } from "../App";
import '../stylesheets/productDetailed.css'

const cond = 'http://localhost:8000/products'

function ProductDetail() {
    const user = useUser();
    const cart = useCart();
    const [hasBought, setHasBought] = useState(false);

    const location = useLocation().pathname;
    const dato = location.length - 1;

    const [productoDetalle, setProductoDetalle] = useState({info: {name:'', price:0, details:''}, imagen:''})
    useEffect( ()=>{
        getProductoDetalle();
    }, []);

    const getProductoDetalle = async () => {
        const res = await axios.get(cond + '/' + location[dato]);
        const resImage = await axios.get(cond + '/image/' + location[dato]);
        setProductoDetalle({ info: res.data, imagen: resImage.data });
    }

    const handleClick = () => {
        if (cart.boughtObj.hasOwnProperty(productoDetalle.info.id)){
            cart.boughtObj[productoDetalle.info.id]++;
        } else{
            cart.boughtObj[productoDetalle.info.id] = 1;
        }
        cart.setBoughtObj({...cart.boughtObj});
        // localStorage.setItem('boughtObj', JSON.stringify(cart.boughtObj))
        setHasBought(true);
    }

    if (hasBought){
        if (user.auth) {
            return <Navigate to={'/cart'}/>
        }
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <div className="contenedor-producto-detalle">
                <div className="contenedor-imagen-detalle">
                    <img src={productoDetalle.imagen} alt="" />
                </div>
                <div className="contenedor-detalles-detalle">
                    <h1 className="contenedor-titulo-detalle">
                        {productoDetalle.info.name}
                    </h1>
                    <h2 className="contenedor-precio-detalle">
                        {priceText(productoDetalle.info.price)}
                    </h2>
                    <p className="contenedor-texto-detalle">
                        {productoDetalle.info.details}
                    </p>
                    <button onClick={handleClick} className="buy">BUY</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;
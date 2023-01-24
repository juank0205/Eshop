import axios from "axios";
import { useState, useEffect } from "react";
import { buy } from "./carrito";
import { useLocation } from "react-router-dom";
import '../stylesheets/productDetailed.css'

const cond = 'http://192.168.39.176:8000/products'

function ProductDetail(props) {
    const location = useLocation().pathname;
    const dato = location.length - 1;

    const [productoDetalle, setProductoDetalle] = useState({info: {name:'', price:0, details:''}, imagen:''})
    useEffect( ()=>{
        getProductoDetalle()
    }, [])

    const getProductoDetalle = async () => {
        const res = await axios.get(cond + '/' + location[dato]);
        const resImage = await axios.get(cond + '/image/' + location[dato]);
        setProductoDetalle({ info: res.data, imagen: resImage.data });
    }

    const handleClick = () => {
        buy(productoDetalle.info.id);
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
                        {productoDetalle.info.price}$
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
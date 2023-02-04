import axios from "axios";
import { priceText } from "../../App";

const URL = 'https://eshop-ynv8.onrender.com/products/book/';

function Bought(props) {
    //Funcion de reservar un producto en el servidor, segun la respusta, decide si compra el producto o hace un alert diciendo que no hay stock
    const handleClickBuy = async () => {
        const res = await axios.get(URL + props.id + '?f=book');
        res.data === 'Booked' ? props.handleBuy(props.id) : res.data === 'Stockout'? alert('Item out of stock'): void(0);
    }

    //Funcion de devolver un item del carrito, si la cantidad de objetos reservados es igual a 0, eliminar el producto del carrito
    const handleClickDelete = async () => {
        const res = await axios.get(URL + props.id + '?f=unbook');
        res.data === 'Unbooked' ? props.handleDelete(props.id) : void(0);
    }

    return (
        <div className="contenedor-comprado">
            <div className="contenedor-imagen-comprado">
                <img src={props.image[0]} alt="" />
            </div>
            <div className="contenedor-producto-comprado">
                <p>{props.name}</p>
            </div>
            <div className="contenedor-cantidad-comprado">
                <p>{props.quantity}</p>
            </div>
            <div className="contenedor-precio-comprado">
                <p>{priceText(props.price*props.quantity)}</p>
            </div>
            <div className="delete-add">
                <button onClick={handleClickBuy} className="add">+</button>
                <button onClick={handleClickDelete} className="delete">-</button>
            </div>
        </div>
    )
}

export default Bought;


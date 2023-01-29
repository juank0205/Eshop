import { priceText } from "../../App";

function Bought(props) {
    const handleClickBuy = () => {
        props.handleBuy(props.id);
    }

    const handleClickDelete = ( )=> {
        props.handleDelete(props.id);
    }

    return (
        <div className="contenedor-comprado">
            <div className="contenedor-imagen-comprado">
                <img src={props.image} alt="" />
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


import { boughtObj, buy, deleteBought } from "./carrito";

function Bought(props){

    return(
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
                <p>{props.price}</p>
            </div>
        </div>
    )
}

export default Bought;


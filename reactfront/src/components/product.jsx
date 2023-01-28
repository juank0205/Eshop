import { Link } from 'react-router-dom';
import { priceText } from '../App';
import '../stylesheets/product.css'

function Product(props){
    return(
        <Link to={`/front/${props.id}`}>
            <div className="contenedor-producto">
                <div className="contenedor-imagen-producto">
                    <img src={props.image} alt="product"/>
                </div>
                <div className="detalles-producto">
                    <h4>{priceText(props.price)}</h4>
                    <h4>{props.name}</h4>
                    <p>{props.details}</p>
                </div>
            </div>
        </Link>
    )
}

export default Product;
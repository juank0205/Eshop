import { Link } from 'react-router-dom';
import { priceText } from '../../App';
import ImageSlider, { Slide } from "react-auto-image-slider";
import useUser from '../hooks/UseUser';
import '../../stylesheets/product.css'

function Product(props) {
    const user = useUser();
    return (
        <Link to={user.isAdmin === 'true' ? `/edit/${props.id}` : `/front/${props.id}`}>
            <div className="contenedor-producto">
                <div className="contenedor-imagen-producto">
                    <ImageSlider effectDelay={1000} autoPlayDelay={2000}>
                        <Slide>
                            <img alt="img2" src={props.image[0]} />
                        </Slide>
                        <Slide>
                            <img alt="img2" src={props.image[1]} />
                        </Slide>
                        <Slide>
                            <img alt="img1" src={props.image[2]} />
                        </Slide>
                    </ImageSlider>
                </div>
                <div className="detalles-producto">
                    <h4>{priceText(props.price)}</h4>
                    <h4>{props.name}</h4>
                </div>
            </div>
        </Link>
    )
}

export default Product;
import '../stylesheets/product.css'

function Product(props){
    return(
        <div className="contenedor-producto">
            <div className="contenedor-imagen-producto">
                <img src={props.image} alt={props.imageName} />
            </div>
            <div className="detallesProducto">
                <h4>{props.price}</h4>
                <h4>{props.name}</h4>
                <p>{props.details}</p>
            </div>
        </div>
    )
}

export default Product;
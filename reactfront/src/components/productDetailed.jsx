function productDetail(props){
    return(
        <div className="contenedor-detalles">
            <div className="contenedor-imagen">
                <img src={props.imagen} alt="" />
            </div>
            <div className="contenedor-detalles">
                <div className="contenedor-titulo">
                    <p>{props.name}</p>
                </div>
                <div className="contenedor-precio">
                    <p>{props.title}</p>
                </div>
                <div className="contenedor-texto">
                    <p>{props.details}</p>
                </div>
                
            </div>
        </div>
    )
}
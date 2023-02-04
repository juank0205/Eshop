import React from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';

//Hooks y contextos
import { useState } from 'react';

const URL = 'https://eshop-ynv8.onrender.com/products/'

const EditProduct = () => {
    //Establecer hooks para el manejo de formularios
    const [hasUpdated, setHasUpdated] = useState(false);
    const [body, setbody] = useState({name: '', details: '', price: 0, stockMax: 0, stockMin: 0, stockCurrent: 0});
    
    //Obtener el id de el parametro de la url
    const dato = useLocation().pathname.split('/')[2];

    //Camibiar el valor de los hooks segun el contenido delformulario
    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    //Al finalizar con el formulario, realizar la peticion con el cuerpo definido en los input
    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(URL + '/' + dato, body)
        .then(({data})=> {
            alert('Register succesfully updated');
        })
        .catch(({response}) => {alert(response.message)});
        setHasUpdated(true);
    }

    //Si el admin ya actualizo un producto, redireccionarlo a la pagina principal
    if (hasUpdated){
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">Edit Product</h1>
                    <form>
                        <div className="texto-form">Nombre:</div>
                        <input type="text" name="name" value={body.name} onChange={inputChange}/>
                        <div className="texto-form">Details:</div>
                        <input type="text" name="details" value={body.details} onChange={inputChange}/>
                        <div className="texto-form">Price:</div>
                        <input type="text" name="price" value={body.price} onChange={inputChange}/>
                        <div className="texto-form">Stock Min:</div>
                        <input type="text" name="stockMin" value={body.stockMin} onChange={inputChange}/>
                        <div className="texto-form">Stock Max:</div>
                        <input type="text" name="stockMax" value={body.stockMax} onChange={inputChange}/>
                        <div className="texto-form">Stock Current:</div>
                        <input type="text" name="stockCurrent" value={body.stockCurrent} onChange={inputChange}/>
                        <button onClick={onSubmit}>CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProduct
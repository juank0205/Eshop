import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';

const URL = 'http://localhost:8000/products'

const EditProduct = () => {
    const [hasUpdated, setHasUpdated] = useState(false);
    const [body, setbody] = useState({name: '', details: '', price: 0, stockMax: 0, stockMin: 0, stockCurrent: 0});
    
    const dato = useLocation().pathname.split('/')[2];

    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(URL + '/' + dato, body)
        .then(({data})=> {
            alert('Register succesfully updated');
        })
        .catch(({response}) => {alert(response.message)});
        setHasUpdated(true);
    }

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
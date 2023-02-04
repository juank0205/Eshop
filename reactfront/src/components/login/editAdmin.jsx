import React from 'react';
import axios from 'axios';

//Hooks y contextos
import { useState } from 'react';
import useUser from '../hooks/UseUser';

//Routing
import { Navigate } from 'react-router-dom';

const URL = 'https://eshop-ynv8.onrender.com/products/admin'

//Componente
const EditAdmin = () => {
    //Impprtar el contexto del usuario
    const user = useUser();

    //Definir hooks para el manejo de formularios
    const [hasUpdated, setHasUpdated] = useState(false);
    const [body, setbody] = useState({username: '', password: '', email: '', address: '', phone: 0});
    
    //Funcion para cambiar el hook cada vez que cambia el input del form
    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    //funcion la cual se ejecuta cada vez que el form se da sumit al formulario
    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(URL, body)
        .then(({data})=> {
            alert('Admin succesfully updated');
        })
        .catch(({response}) => {alert(response.message)});
        setHasUpdated(true);
    }

    if (hasUpdated){//se pregunta si se ya se edito el admin
        return <Navigate to={'/'}/>
    }
    
    if (!user.isAdmin) return <Navigate to={'/'}/>//comprueba si el usuario es admin, si no lo es lo redirige a la pagina principal

    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">Edit Admin</h1>
                    <form>
                        <div className="texto-form">Username:</div>
                        <input type="text" name="username" value={body.username} onChange={inputChange}/>
                        <div className="texto-form">Password:</div>
                        <input type="password" name="password" value={body.password} onChange={inputChange}/>
                        <div className="texto-form">email:</div>
                        <input type="text" name="email" value={body.email} onChange={inputChange}/>
                        <div className="texto-form">Address:</div>
                        <input type="text" name="address" value={body.address} onChange={inputChange}/>
                        <div className="texto-form">Phone:</div>
                        <input type="text" name="phone" value={body.phone} onChange={inputChange}/>
                        <button onClick={onSubmit}>CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditAdmin
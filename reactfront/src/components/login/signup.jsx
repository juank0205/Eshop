import axios from 'axios';
import { Navigate } from 'react-router-dom';

//Hooks
import { useState } from 'react';
import '../../stylesheets/login.css'

function Signup({funcion}) {
    //Definir los hooks para controlar el formulario
    const [body, setbody] = useState({username: '', password: '', email: '', address: '', phone: 0});
    const [auth, setAuth] = useState(false);

    //Establecer el valor de los hooks a lo que esta en los imputs del formulario
    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    //Al terminar con el formulario, realizar la peticion al servidor para 
    const onSubmit = e => {
        e.preventDefault();
        axios.post('https://eshop-ynv8.onrender.com/products/signup', body)
        .then(({data})=> {
            if(data !== 'User Created successfully') return alert('Data not valid');
            //Si la peticion fue exitosa
            //guardar datos en localstorage
            localStorage.setItem('auth', true);
            localStorage.setItem('username', body.username);
            //Cambiar el valor de los contextos
            funcion(true);
            setAuth(true);
            alert('User created succesfully')
        })
        .catch((response) => alert(response.message));
    }

    //Si el usuario no esta regustrado, redireccionar a la pagina principal
    if(auth){
        return <Navigate to='/'/>
    }

    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">SIGN UP</h1>
                    <form>
                        <div className="texto-form">Usuario:</div>
                        <input type="text" name="username" value={body.username} onChange={inputChange}/>
                        <div className="texto-form">Contraseña:</div>
                        <input type="password" name="password" value={body.password} onChange={inputChange}/>
                        <div className="texto-form">Email:</div>
                        <input type="text" name="email" value={body.email} onChange={inputChange}/>
                        <div className="texto-form">Addres:</div>
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

export default Signup;
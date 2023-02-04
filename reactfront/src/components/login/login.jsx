import { useState } from 'react';
import '../../stylesheets/login.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
function Login({funcion}) {

    const [body, setbody] = useState({username: '', password: ''});//se utilizara el hook para gruardar la contraseña del usuario y su nombre
    const [auth, setAuth] = useState(false);//se utilizara este hook para comprobar si el usuario ya se ha autentificado

    //esta funcion obtendra los valores de los input
    const inputChange = ({target}) => {//se desestructura el Event y solo se obtiene la propiedad tarjet
        const { name, value } = target;//la desestruturamos para obtener el nombre de la propiedad y el valor
        setbody({...body, [name]: value});  //desestructuramos el body y le agregamos la propiedad y valor
    }

    //esta funcion se ejecutara cada vez que se le de sumit al form
    const onSubmit = e => {
        e.preventDefault();
        axios.post('https://eshop-ynv8.onrender.com/products/login', body)//le acemos la peticion al servidor
        .then(({data})=> {
            if(data === 'Usuario no valido') return alert('User and/or password are incorrect');//verificamos si el usuario es valido
            localStorage.setItem('auth', true);
            localStorage.setItem('username', data.username);
            localStorage.setItem('isAdmin', data.isAdmin);
            funcion(true);
            setAuth(true);
        })
        .catch(({response}) => {console.log(response)});
    }

    if(auth){//si el usuario ya esta autentificado, se redirige a la pagina principal
        return <Navigate to='/'/>//navegamos a la paina principal
    }

    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">LOGIN</h1>
                    <form>
                        <div className="texto-form">Usuario:</div>
                        <input type="text" name="username" value={body.username} onChange={inputChange}/>
                        <div className="texto-form">Contraseña:</div>
                        <input type="password" name='password' value={body.password} onChange={inputChange}/>
                        <button onClick={onSubmit}>CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
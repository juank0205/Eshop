import { useState } from 'react';
import '../stylesheets/login.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Signup({funcion}) {

    const [body, setbody] = useState({username: '', password: ''});
    const [auth, setAuth] = useState(false);

    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/products/signup', body)
        .then(({data})=> {
            if(data === 'Usuario no valido') return;
            localStorage.setItem('auth', true);
            localStorage.setItem('username', data.username);
            funcion(true);
            setAuth(true);
        })
        .catch(({response}) => {console.log(response)});
    }

    if(auth){
        return <Navigate to='/'/>
    }
    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">SIGN UP</h1>
                    <form action="">
                        <div className="texto-form">Usuario:</div>
                        <input type="text" />
                        <div className="texto-form">Contraseña:</div>
                        <input type="password" />
                        <button type="submit">CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
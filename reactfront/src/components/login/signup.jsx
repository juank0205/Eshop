import { useState } from 'react';
import '../../stylesheets/login.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Signup({funcion}) {

    const [body, setbody] = useState({username: '', password: '', email: '', address: '', phone: 0});
    const [auth, setAuth] = useState(false);

    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(body);
        axios.post('http://localhost:8000/products/signup', body)
        .then(({data})=> {
            if(data !== 'Usuario Creado exitosamente') return;
            localStorage.setItem('auth', true);
            localStorage.setItem('username', body.username);
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
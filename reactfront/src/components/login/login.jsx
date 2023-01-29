import { useState } from 'react';
import '../../stylesheets/login.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
function Login({funcion}) {

    const [body, setbody] = useState({username: '', password: ''});
    const [auth, setAuth] = useState(false);

    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/products/login', body)
        .then(({data})=> {
            if(data === 'Usuario no valido') return alert('User and/or password are incorrect');
            localStorage.setItem('auth', true);
            localStorage.setItem('username', data.username);
            localStorage.setItem('isAdmin', data.isAdmin);
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
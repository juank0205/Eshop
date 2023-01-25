import { useState } from 'react';
import '../stylesheets/login.css'
import axios from 'axios';

function Login() {

    const [body, setbody] = useState({username: '', password: ''});

    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/products/login', body)
        .then(({data})=> {console.log(data)})
        .catch(({response}) => {console.log(response)});
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
                        <input type="text" name='password' value={body.password} onChange={inputChange}/>
                        <button onClick={onSubmit}>CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
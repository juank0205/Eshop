import { useState } from 'react';
import '../stylesheets/login.css'

function Login() {

    const [username, setUsername] = useState('');
    const handleLogin = (event) => {
        console.log(event.target);
    }

    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">LOGIN</h1>
                    <form action="" onSubmit={handleLogin}>
                        <div className="texto-form" name="username">Usuario:</div>
                        <input type="text" />
                        <div className="texto-form" name="password">Contraseña:</div>
                        <input type="text" />
                        <button type="submit">CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
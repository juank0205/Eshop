import '../stylesheets/login.css'

function Signup() {
    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">SIGN UP</h1>
                    <form action="">
                        <div className="texto-form">Usuario:</div>
                        <input type="text" />
                        <div className="texto-form">Contraseña:</div>
                        <input type="text" />
                        <button type="submit">CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
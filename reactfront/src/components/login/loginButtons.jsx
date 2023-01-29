import React from 'react'
import { Link } from 'react-router-dom';
import userLogo from '../../images/user.png';
import useUser from '../hooks/UseUser';
import cart from '../../images/cart.png';

const LoginButtons = ({logout}) => {
    const user = useUser();

    const handleClick = () =>{
        logout(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        window.location.href = '/';
    }

    if (user.auth) {
        return (
            <div className="contenedor-auth">
                <button className="user" onClick={handleClick}>LOGOUT</button>
                <div className="container-user">
                    <img src={userLogo} alt="Logo" />
                </div>
                <div className="username">{user.username}</div>
                <div className="contenedor-carrito">
                <Link to={'/cart/'}>
                  <img src={cart} alt="cart" />
                </Link>
              </div>
            </div>
        )
    } else {
        return (
            <div className="contenedor-auth">
                <Link to={'/signup'}>
                    <button className="user signup">SIGN UP</button>
                </Link>
                <Link to={'/login'}>
                    <button className="user login">LOGIN</button>
                </Link>
            </div>
        )
    }
}


export default LoginButtons
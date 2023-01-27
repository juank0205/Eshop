import './App.css';
import CompShowProducts from './components/showProduct.jsx';
import ProductDetail from './components/productDetailed';
import logo from './images/logo.png'
import cart from './images/cart.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Carrito from './components/carrito';
import Login from './components/login';
import Signup from './components/signup';
import UserContext from './components/context/UserContext'
import { useState, useEffect } from 'react';
import LoginButtons from './components/loginButtons';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    let auth = localStorage.getItem('auth') || false;
    setIsAuth(auth);
  }, [isAuth]);

  const setter = (value) => {
    setIsAuth(value);
  }

  return (
    <UserContext.Provider value={{ auth: isAuth, username: localStorage.getItem('username') }}>
      <div className="App">
        <BrowserRouter>
          <header className="header">
            <div className="contenedor-logo">
              <Link to={'/'}>
                <img src={logo} alt="logo" />
              </Link>
            </div>

            <div className="header-derecha">
              <div className="contenedor-auth">
                <LoginButtons logout={setter} />
              </div>
              <div className="contenedor-carrito">
                <Link to={'/cart/'}>
                  <img src={cart} alt="cart" />
                </Link>
              </div>
            </div>
          </header>
          <Routes>
            <Route path='/' element={<CompShowProducts />} />
            <Route path='/front/:id' element={<ProductDetail />} />
            <Route path='/cart/' element={<Carrito />} />
            <Route path='/login' element={<Login funcion={setter}/>}/>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>

  );
}

export default App;

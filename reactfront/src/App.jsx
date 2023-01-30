import './App.css';
import CompShowProducts from './components/products/showProduct.jsx';
import ProductDetail from './components/products/productDetailed';
import logo from './images/logo.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Carrito from './components/carrito';
import Login from './components/login/login';
import Signup from './components/login/signup';
import EditProduct from './components/products/editProduct';
import CartContext from './components/context/CartContext';
import UserContext from './components/context/UserContext'
import { useState, useEffect } from 'react';
import LoginButtons from './components/login/loginButtons';
import EditAdmin from './components/login/editAdmin';

export const priceText = price => {
  price = String(price);
  let string = '$';
  for (let i = 0; i < price.length; i++) {
    string += price[i];
    if ((price.length - i -1) % 3 === 0 && i !== price.length - 1) {
      string += '.';
    }
  }
  return string;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let admin = localStorage.getItem('isAdmin') || false;
    setIsAdmin(admin);
  }, [isAdmin])
  
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    let auth = localStorage.getItem('auth') || false;
    setIsAuth(auth);
  }, [isAuth]);

  const setter = (value) => {
    setIsAuth(value);
    setIsAdmin(value);
  }

  const [cartObj, setCartObj] = useState({});
  const setterCartObj = value => setCartObj(value);

  return (
    <UserContext.Provider value={{ auth: isAuth, username: localStorage.getItem('username'), isAdmin: isAdmin }}>
      <CartContext.Provider value={{ boughtObj: cartObj, setBoughtObj: setterCartObj }}>
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
              </div>
            </header>
            <Routes>
              <Route path='/' element={<CompShowProducts />} />
              <Route path='/front/:id' element={<ProductDetail />} />
              <Route path='/edit/:id' element={<EditProduct />} />
              <Route path='/cart/' element={<Carrito />} />
              <Route path='/login' element={<Login funcion={setter} />} />
              <Route path='/signup' element={<Signup funcion={setter} />}></Route>
              <Route path='/admin' element={<EditAdmin />}/>
              
            </Routes>
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>

  );
}

export default App;

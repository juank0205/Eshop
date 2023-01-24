import './App.css';
import CompShowProducts from './components/showProduct.jsx';
import ProductDetail from './components/productDetailed';
import logo from './images/logo.png'
import cart from './images/cart.png'
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Carrito from './components/carrito';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="header">
          <div className="contenedor-logo">
            <Link to={'/'}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="contenedor-auth">
            <Link to={'/signup'}>
              <button className="user signup">SIGN UP</button>
            </Link>
            <Link to={'/login'}>
              <button className="user login">LOGIN</button>
            </Link>
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
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

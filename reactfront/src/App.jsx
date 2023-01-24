import './App.css';
import CompShowProducts from './components/showProduct.jsx';
import ProductDetail from './components/productDetailed';
import logo from './images/logo.png'
import cart from './images/cart.png'
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Carrito from './components/carrito';

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
            <div className="contenedor-carrito">
              <Link to={'/cart/'}>
                <img src={cart} alt="cart" />
              </Link>
            </div>
          </header>
        <Routes>
          <Route path='/' element={<CompShowProducts/>}/>
          <Route path='/front/:id' element={<ProductDetail/>}/>
          <Route path='/cart/' element={<Carrito/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

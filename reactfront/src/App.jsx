import './App.css';
import CompShowProducts from './components/showProduct.jsx';
import logo from './images/logo.png'
import cart from './images/cart.png'

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="contenedor-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="contenedor-carrito">
          <img src={cart} alt="cart" />
        </div>
      </header>
      <CompShowProducts />

    </div>
  );
}

export default App;

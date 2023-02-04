import { useContext } from "react";
import CartContext from "../context/CartContext";

//Exportar el contexto del carrito y que sea visible para otros componentes
const useCart = () => useContext(CartContext);

export default useCart;
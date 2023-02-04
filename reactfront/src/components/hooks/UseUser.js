import { useContext } from "react";
import UserContext from "../context/UserContext";

//Exportar el componente del usuario para que sea visible para los otros componentes
const useFunction = () => useContext(UserContext);

export default useFunction;
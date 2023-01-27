import { useContext } from "react";
import UserContext from "../context/UserContext";

const useFunction = () => useContext(UserContext);

export default useFunction;
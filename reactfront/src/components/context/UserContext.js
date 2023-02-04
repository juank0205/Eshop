import { createContext } from "react";

const UserContext = createContext({ //Contexto para validar la autentificación del usuario
    auth: false,
    username: null,
    isAdmin: false
});

export default UserContext;
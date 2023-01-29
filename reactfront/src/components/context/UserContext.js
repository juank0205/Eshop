import { createContext } from "react";

const UserContext = createContext({
    auth: false,
    username: null,
    isAdmin: false
});

export default UserContext;
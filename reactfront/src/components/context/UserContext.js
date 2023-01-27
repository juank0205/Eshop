import { createContext } from "react";

const UserContext = createContext({
    auth: false,
    username: null
});

export default UserContext;
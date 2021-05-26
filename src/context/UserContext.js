import React, {createContext, useState, useEffect} from "react";
import authService from '../services/auth'

const UserContext = createContext()

const UserContextProvider = (props) => {
    const [user, setUser] = useState(undefined)
    
    const getUser = () => {
        authService.loggedIn().then(res => {
            setUser(res.data)
        })
    }

    useEffect(() => {
        getUser();
    }, []);

    return <UserContext.Provider value={{user, getUser}}>
        {props.children}
    </UserContext.Provider>;
}
export default UserContext;
export {UserContextProvider}
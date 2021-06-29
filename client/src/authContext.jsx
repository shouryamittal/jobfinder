import React, { useEffect, useState} from 'react';
export const AuthContext = React.createContext({});

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({token: null});
    function setAuthValue(token) {
        localStorage.setItem('x-auth', JSON.stringify(token));
        setAuth({token: token});
    }


    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('x-auth'));
        if(token) {
            setAuth({token:token});
        }
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuthValue}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;

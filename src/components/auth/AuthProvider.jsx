import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token) => {
        const decodedToken = jwt_decode(token);

        if (decodedToken.role) {
            localStorage.setItem("userId", decodedToken.sub);
            localStorage.setItem("userRole", decodedToken.role);
            localStorage.setItem("token", token);
            setUser(decodedToken);

        } else {
            console.error("Roles is undefined in the token");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

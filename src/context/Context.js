import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [userData, setUserData] = useState(false)

    const loginData = () => {
        setUserData(true)
    }

    const logoutData = () => {
        setUserData(false)
    }

    let values = {
        userData, 
        loginData,
        logoutData
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }
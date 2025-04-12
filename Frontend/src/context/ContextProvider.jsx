import React, { createContext } from 'react'

const databaseContext = createContext();

const database_url = "http://localhost:5000"

export default function ContextProvider({ children }) {


    return (
        <databaseContext.Provider value={database_url}>
            {children}
        </databaseContext.Provider>
    )
}

export {
    databaseContext,
    database_url
}
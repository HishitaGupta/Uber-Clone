import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    
    const [captain, setCaptain] = useState({})
    const [isLoading, setIsLoading] = useState({})
    const [error, setError] = useState({})
    
    const updateCaptain =(captainData)=>{
        setCaptain(captainData)
    }

    const value={
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }



  return (

    <CaptainDataContext.Provider value={value}>
    <div>{children}</div>
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
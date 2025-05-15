import React, {createContext, useState, useContext} from 'react'

// Create a context for storing the username
const UsernameContext = createContext()

// Custom hook to use the UsernameContext
export const useUsername = () => {
  return useContext(UsernameContext)
}

// Provider component to wrap around parts of the app that need access to the username
export const UsernameProvider = ({children}) => {
  const [username, setUsername] = useState('')

  return (
    <UsernameContext.Provider value={{username, setUsername}}>
      {children}
    </UsernameContext.Provider>
  )
}

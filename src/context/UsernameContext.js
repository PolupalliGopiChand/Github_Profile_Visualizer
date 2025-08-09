import {createContext, useState} from 'react'

// Create the UsernameContext
export const UsernameContext = createContext()

// Create the Provider component
export const UsernameProvider = ({children}) => {
  const [username, setUsername] = useState('')

  return (
    <UsernameContext.Provider value={{username, setUsername}}>
      {children}
    </UsernameContext.Provider>
  )
}

import React,{createContext,useContext} from 'react'

const authContext = createContext();

const ContextProvider = ({children}) => {
    const [user,setUser] = React.useState(null);
    const login = (user) => {
        setUser(user);
    }
  const logout = () => {
    // clear token and user state
    try {
      localStorage.removeItem('token');
    } catch {
      // ignore
    }
    setUser(null);
  }

  return (
    <authContext.Provider value={{user,login,logout}}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext);

export default ContextProvider

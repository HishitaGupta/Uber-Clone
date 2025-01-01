import React, { createContext } from 'react'



export const UserDataContext = createContext()

const [user, setUser] = useState({
    email:"",
    fullName:{
        firstName:"",
        lastName:"",
    },
}
)

const UserContext = ({ children }) => {
     return (
        <div>
            <UserDataContext.Provider value={[user,setUser]}>
                {children}
            </UserDataContext.Provider></div>
    )
}

export default UserContext
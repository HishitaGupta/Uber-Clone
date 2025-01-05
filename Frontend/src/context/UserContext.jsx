import React, { createContext, useEffect, useState } from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [contextRide, setContextRide] = useState(null);


  return (
    <UserDataContext.Provider value={{user, setUser,contextRide, setContextRide}}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;

// UserContext.js

import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserAfterLogin = userData => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserAfterLogin }}>
      {children}
    </UserContext.Provider>
  );
};

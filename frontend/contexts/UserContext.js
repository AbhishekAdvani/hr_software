import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (user) => {
    setLoggedInUser(user); // { id, name, email, role }
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use anywhere
export const useUser = () => useContext(UserContext);

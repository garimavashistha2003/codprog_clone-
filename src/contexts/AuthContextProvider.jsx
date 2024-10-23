import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [userdetail, setuserdetail] = useState({});
  const [updateblog, setupdateblog] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.access_token) {
      setAuth(user);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userdetail,
        setuserdetail,
        updateblog,
        setupdateblog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
export default AuthContextProvider;

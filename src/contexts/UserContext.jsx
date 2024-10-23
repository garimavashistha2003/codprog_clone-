import React, { createContext, useContext, useState } from 'react'



const UserContext=createContext();

function AuthdatacontextProvider({children}){
    const [userdetail , setuserdetail]=useState({});


  return (
   <AuthdatacontextProvider  value={{userdetail , setuserdetail}}>
    {children}
   </AuthdatacontextProvider>
  )

}

export function useData(){
    return useContext(UserContext);
}

export default AuthdatacontextProvider;
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import React, { useContext } from 'react'

export default function ProtectedRoute({children}) {

    const {token}=useContext(AuthContext);


    if(!token){
  return <Navigate to="/login"></Navigate>
}

return children;
}

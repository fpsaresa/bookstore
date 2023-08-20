import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginAuth = (Component) => {
  
    const Authentication = () => { 
        const email = Cookies.get("email");
        const navigate = useNavigate();

        useEffect(() => {
            if (!email) {
                navigate("/");
            }
        }, [email,navigate]);
        
        return email ? <Component/> : null;
    };
    return Authentication;

};

export default LoginAuth;
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginAuth(Component) {
  
    const Authentication = () => { 
        const navigate = useNavigate()

        const email = Cookies.get("email")

        useEffect(() => {
            if (!email) {
                navigate("/")
            }
        }, [email])
        
        return email ? <Component/> : null
    }
    return Authentication

}

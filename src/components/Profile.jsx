import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()
    
    useState(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(data);
    setName(data.firstName)
    setEmail(data.email)
    setPassword(data.password)
    setRole(data.role)
    })

    const gotoprofile = () => {
        navigate("/updateprofile")
    }

    return (
        <div className='backColor'>
            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Profile </p>
                </div>
            </div>

            <div className="bookContainer">
                    <div className="addbookBox profileBox">
                        <div className='profileData'><b>Name :</b> {name}</div>
                        <div className='profileData'><b>E-mail : </b>{email}</div>
                        <div className='profileData'><b>Password :</b> {password}</div>
                        <div className='profileData'><b>Role :</b> {role}</div>
                        <div className='oredrBtn'><button className='oredrBtn profileBtn' onClick={gotoprofile}>Edit Profile</button></div>
                    </div>
            </div>

        </div>
    )
}
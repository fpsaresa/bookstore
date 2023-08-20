import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import { MenuItem, Select, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditUser() {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [roleId, setRoleId] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')

    const [role, setRole] = useState('')

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const addBookData = (value) => {

        if (value.roleId === 1) {
            setRole("admin")
        }else if(value.roleId === 2){
            setRole("seller")
        }else{
            setRole("buyer")
        }

        const payload = {
            id: id,
            email: value.email,
            firstName: value.fname,
            lastName: value.lname,
            roleId: value.roleId,
            role: role,
            password: value.password
        }

        axios.put(`${URL}/user`, payload).then((res) => {
            toast("User updated")
        }).catch(() => {
            toast("User not updated")
            console.log("Book cannot add");
        })

    }

    useState(() => {
        setFname(localStorage.getItem("firstName"))
        setLname(localStorage.getItem("lastName"))
        setRoleId(localStorage.getItem("roleId"))
        setPassword(localStorage.getItem("password"))
        setEmail(localStorage.getItem("email"))
        setId(localStorage.getItem("id"))
    })

    return (
        <div className='backColor'>
            <div className='serchBox'>
                <Searchbar />
            </div>

            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Edit User</p>
                </div>
            </div>

            <div>
                <Formik initialValues={{ fname: fname, lname: lname, roleId: roleId, password: password, email: email }} onSubmit={(values) => {addBookData(values)}}
                >
                    {({ values, setFieldValue, errors }) => {
                        // console.log(values);
                        return (
                            <Form>
                                <div className='bookContainer addbookCon '>
                                    <div className="addbookBox userBox">
                                        <div>
                                            <TextField variant='outlined' label="First-Name" className='addFormFeild' name='fname' size='small' value={values.fname} onChange={(e) => { setFieldValue("fname", e.target.value) }} />
                                            <TextField variant='outlined' sx={{ml : 3}} label="Last-Name" className='addBookTxt addFormFeild' name='lname' size='small' value={values.lname} onChange={(e) => { setFieldValue("lname", e.target.value) }} />
                                        </div>

                                        <div>
                                            <Select className='menu addFormFeild' name='roleId' value={values.roleId} onChange={(e) => { setFieldValue("roleId", e.target.value) }} >
                                                <MenuItem value={1}>Admin</MenuItem>
                                                <MenuItem value={3}>Buyer</MenuItem>
                                                <MenuItem value={2}>Seller</MenuItem>
                                            </Select>
                                            {/* <label className='addBtn chooseImag addFormFeild'>
                                                Choose Image
                                                <input type='file' name='image' className='imageSelect' value={values.image} onChange={(e) => { handleImage(e, setFieldValue) }} />
                                            </label> */}
                                        </div>

                                        <TextField variant='outlined' sx={{mb : 3}} label="Password" className='text addFormFeild' name='password' size='small' value={values.password} onChange={(e) => { setFieldValue("password", e.target.value) }} />
                                        <TextField variant='outlined' className=' addFormFeild' size='small' label="E-mail" name='email' value={values.email} onChange={(e) => { setFieldValue("email", e.target.value) }} />
                                        <div className="sumbmitBox">
                                        <button className='addBtn submitBtn' type='submit'>Submit</button>
                                        </div>
                                    </div>


                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </div>
    )
}

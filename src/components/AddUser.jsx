import React from 'react'
import Searchbar from './Searchbar'
import { MenuItem, Select, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddUser() {

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const addBookData = (value) => {

        const payload = {
            firstName: value.fname,
            lastName: value.lname,
            email: value.email,
            roleId: value.roleId,
            password: value.password
        }

        axios.post(`${URL}/user`, payload).then((res) => {
            toast("User added")
        }).catch(() => {
            toast("User not added")
            console.log("Book cannot add");
        })

    }

    return (
        <div className='backColor'>
            <div className='serchBox'>
                <Searchbar />
            </div>

            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Add User</p>
                </div>
            </div>

            <div>
                <Formik initialValues={{ fname: '', lname: '', roleId: '', password: '', email: '' }} onSubmit={(values) => {addBookData(values)}}
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

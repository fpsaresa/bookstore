import { Button, FormHelperText, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { ErrorMessage, Form, Formik } from 'formik'
import Cookies from 'js-cookie';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { AppContext } from '../context/Context';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {

    const URL = "https://book-e-sell-node-api.vercel.app/api/user"

    const navigate = useNavigate();

    const Context = useContext(AuthContext)

    const userContext = useContext(AppContext)
    // console.log(userContext.userData);

    const loginUser = async(values) => {

        const payload = {
            email: values.email,
            password: values.password
        }

        await axios.post(`${URL}/login`, payload).then((res) => {
            toast("Login Successful!")
            localStorage.setItem("userInfo", JSON.stringify(res.data.result))
            Context.setUser(res.data.result)
            navigate("/books")
            Cookies.set("email", values.email)
            userContext.loginData()
            console.log(userContext.userData);
        }).catch(() => {
            toast("Unable to Login!!")
        })

    }

    const validationSchema = yup.object().shape({
        email: yup.string().email().required("E-mail should not be empty!"),
        password: yup.string().required("Password should not be empty!")
            // .matches(/^\S*$/, "Whitespace is not allowed!")
            // .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            //     "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            // )
    })

    const createUser = () => {
        navigate("/form")
    }

    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => { loginUser(values) }}
            validationSchema={validationSchema}>
            {({ values, setFieldValue, handleBlur }) => {
                return (
                    <Form>
                        <div className = "loginImg">
                        <div className="formContainer">
                            <div className="loginBox loginWidth">
                                <Typography variant='h4'>Login</Typography><br /><hr /><br />

                                <TextField variant='outlined' label="E-mail" size='small' name='email' onBlur={handleBlur} value={values.email} onChange={(e) => { setFieldValue("email", e.target.value) }} />
                                <FormHelperText error>
                                    <ErrorMessage name='email' />
                                </FormHelperText><br />

                                <TextField variant='outlined' label="Password" size='small' name='password' onBlur={handleBlur} value={values.password} onChange={(e) => { setFieldValue("password", e.target.value) }} />
                                <FormHelperText error>
                                    <ErrorMessage name='password' />
                                </FormHelperText><br />

                                <Button  variant='contained' type='submit'>Log in</Button>

                                <div className="creatUser">
                                    Not registered? 
                                    <span onClick={createUser}> Create an account</span>
                                </div>

                            </div>
                        </div>
                        </div>
                    </Form>
                )
            }}

        </Formik>
    )
}

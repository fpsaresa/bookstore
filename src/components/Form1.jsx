import { Button, FormHelperText, MenuItem, Select, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import LoginAuth from '../authfile/LoginAuth';

function Form1() {

  // const [userName, setUserName] = useState("")
  // const [password, setPassword] = useState("")
  const [data, setData] = useState();

  const URL = "https://book-e-sell-node-api.vercel.app/api/user"

  const submitData = (values) => {
    // console.log("username: ", userName);
    // console.log("password: ", password);
    // console.log("submit btn clicked");

    const payload = {
      firstName: values.username,
      lastName: "xyz",
      email: values.email,
      roleId: values.age,
      password: values.password
    }

    axios.post(URL, payload).then((res) => {
        console.log("data added sucessfully");
        toast("Data added successfully!")
    }).catch(() => {
        console.log("error occurs");
    })

    // console.log(values);

  }

  const validationSchema = yup.object().shape({
    username: yup.string().required("UserName should not be empty!")
    .matches(/[0-9]/, "password must have at least one number!")
    .matches(/[a-z]/, "password must have at least one lowercase alphabet!")
    .matches(/^\S*$/, "Whitespace is not allowed!"),
    email: yup.string().required("E-mail should not be empty!").email(),
    age: yup.number().required("Age should not be empty!").positive().integer().min(18).max(100),
    password: yup.string().required("Password should not be empty!")
    .matches(/^\S*$/, "Whitespace is not allowed!")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    // .matches(/[0-9]/, "password must have at least one number!")
    // .matches(/[a-z]/, "password must have at least one lowercase alphabet!")
    // .matches(/[A-Z]/, "password must have at least one uppercase alphabet!")
  })

  const getRequestData = async() => {

    await axios.get(`${URL}/all`).then((res) => {
        setData(res.data)
    }).catch(() => {
        console.log("Data not found");
    }) 

  }
  
  console.log(data);

  useEffect(() => {
    // console.log("useEffect called");
    getRequestData()
  }, [])

  return (
    <Formik initialValues={{ username: '', age: '', email: '', password: '' }} onSubmit={(values) => { submitData(values) }}
    validationSchema={validationSchema}>
      {({values, setFieldValue, handleBlur, errors}) => {
        // console.log("values", values);
        // console.log("error", errors);
        return (
          <Form>
             <div className = "loginImg">
            <div className='formContainer'>
              <div className='loginBox'>
                <Typography variant='h4' color={red} >Register here!</Typography><br /><hr/><br />

                <TextField variant='outlined' label='User-Name' className='text' name='username' size='small' onBlur={handleBlur} value={values.username} onChange={(e) => {setFieldValue("username", e.target.value) }} ></TextField>
                <FormHelperText error>
                  <ErrorMessage name='username'/>
                </FormHelperText><br />

                <TextField variant='outlined' label='E-mail' className='text' name='email' size='small' onBlur={handleBlur} value={values.email} onChange={(e)=> setFieldValue("email", e.target.value)} ></TextField>
                <FormHelperText error>
                  <ErrorMessage name='email'/>
                </FormHelperText><br />

                <Select name='role'  className='text' size='small' value={values.role} onChange={(e) => setFieldValue("role", e.target.value)}>
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={3}>Buyer</MenuItem>
                  <MenuItem value={2}>Seller</MenuItem>
                </Select><br /><br />

                <TextField variant='outlined' label='Password' className='text' name='password' size='small' onBlur={handleBlur} value={values.password} onChange={(e)=> setFieldValue("password", e.target.value)}></TextField>
                <FormHelperText error>
                  <ErrorMessage name='password'/>
                </FormHelperText><br />

                <Button variant='contained' type='submit'>Submit</Button>
              </div>
            </div>
            </div>
          </Form>
        )
      }}
    </Formik>
    

  )
}

export default Form1
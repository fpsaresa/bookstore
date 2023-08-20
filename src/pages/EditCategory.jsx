import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditCategory() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const addBookData = (value) => {

        const payload = {
            id: id,
            name: value.categoryName
        }

        axios.put(`${URL}/category`, payload).then((res) => {
            toast("Category updated")
        }).catch(() => {
            toast("Category not update")
            console.log("Book cannot add");
        })

    }

    useState(()=>{
        setId(localStorage.getItem("id"))
        setName(localStorage.getItem("name"))
   })

    return (
        <div>
          
            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Edit Category</p>
                </div>
            </div>

            <div>
                <Formik initialValues={{ categoryName: name}} onSubmit={(values) => {addBookData(values)}}
                >
                    {({ values, setFieldValue, errors }) => {
                        // console.log(values);
                        return (
                            <Form>
                                <div className='bookContainer addbookCon '>
                                    <div className="addbookBox cateBox">
                                        <div>
                                            <TextField variant='outlined' label="Category-Name" className='cateTxt addFormFeild' name='categoryName' size='small' value={values.categoryName} onChange={(e) => { setFieldValue("categoryName", e.target.value) }} />
                                        </div>

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
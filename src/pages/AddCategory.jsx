import React from 'react'
import { TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddCategory() {

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const addBookData = (value) => {

        const payload = {
            name: value.categoryName
        }

        axios.post(`${URL}/category`, payload).then((res) => {
            toast("Category added")
        }).catch(() => {
            toast("Category not added")
            console.log("Book cannot add");
        })

    }

    return (
        <div>

            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Add Category</p>
                </div>
            </div>

            <div>
                <Formik initialValues={{ categoryName: ''}} onSubmit={(values) => {addBookData(values)}}
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
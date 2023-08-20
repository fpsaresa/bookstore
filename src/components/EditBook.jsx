import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import { MenuItem, Select, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditBook() {

    const [category, setCategory] = useState([])
    const [img, setImg] = useState('')

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [id, setId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [imageValue, setImageValue] = useState('')

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    useEffect(() => {
        axios.get(`${URL}/category/all`).then((res) => {
            setCategory(res.data)
        }).catch(() => {
            console.log("data not found");
        })
    }, [])

    const addBookData = (value) => {

        if (img) {
            var image = img
        }else{
            var image = imageValue
        }

        const payload = {
            id: id,
            name: value.bookname,
            description: value.description,
            price: value.price,
            categoryId: value.category,
            base64image: image,
        }

        axios.put(`${URL}/book`, payload).then((res) => {
            toast("Book updated")
        }).catch(() => {
            toast("Book not added")
            console.log("Book cannot add");
        })

    }

    const imgToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            if (file) {
                reader.readAsDataURL(file)
            }
            reader.onload = () => {
                setImg(reader.result)
            }
            // console.log(img);
        })

    }

    const handleImage = async (e, setFieldValue) => {
        const file = e.target.files[0]

            const base64Img = await imgToBase64(file)
            setFieldValue('image', base64Img)
            console.log(base64Img);

    }

    useState(() => {
        setName(localStorage.getItem("name"))
        setPrice(localStorage.getItem("price"))
        setId(localStorage.getItem("id"))
        setCategoryId(localStorage.getItem("category"))
        setDescription(localStorage.getItem("description"))
        setImageValue(localStorage.getItem("image"))
    })

    return (
        <div className='backColor'>
            <div className='serchBox'>
                <Searchbar />
            </div>

            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Edit Books</p>
                </div>
            </div>

            <div>
                <Formik initialValues={{ bookname: name, price: price, category: categoryId, image: '', description: description }} onSubmit={(values) => { addBookData(values) }}
                >
                    {({ values, setFieldValue, errors }) => {
                        // console.log(values);
                        return (
                            <Form>
                                <div className='bookContainer addbookCon '>
                                    <div className="addbookBox">
                                        <div>
                                            <TextField variant='outlined' label="Book-Name" className='text addFormFeild' name='bookname' size='small' value={values.bookname} onChange={(e) => { setFieldValue("bookname", e.target.value) }} />
                                            <TextField variant='outlined' sx={{ ml: 3 }} label="Price" className='addBookTxt addFormFeild' name='price' size='small' value={values.price} onChange={(e) => { setFieldValue("price", e.target.value) }} />
                                        </div>

                                        <div>
                                            <Select className='menu addFormFeild' name='category' value={values.category} onChange={(e) => { setFieldValue("category", e.target.value) }} >
                                                {category.result?.map((e) => {
                                                    return <MenuItem value={e.id} key={e._id}>{e.name}</MenuItem>
                                                })}
                                                {/* <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem> */}
                                            </Select>
                                            <label className='addBtn chooseImag addFormFeild'>
                                                Choose Image
                                                <input type='file' name='image' className='imageSelect' value={values.image} onChange={(e) => { handleImage(e, setFieldValue) }} />
                                            </label>
                                        </div>

                                        <TextField variant='outlined' className='dsescription addFormFeild' size='small' label="Description" name='description' value={values.description} onChange={(e) => { setFieldValue("description", e.target.value) }} />
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

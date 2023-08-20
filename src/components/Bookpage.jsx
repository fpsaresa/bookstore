import React, {  useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Bookpage() {

    const [bookData, setBookData] = useState([])
    const [index, setIndex] = useState(1)
    const navigate = useNavigate()

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const getBookData = () => {
        axios.get(`${URL}/book?pageSize=10&pageIndex=${index}`).then((res) => {
            const data = res.data
            setBookData(data.result.items)
        })
    }

    useEffect(() => {
        getBookData()
    }, [index])

    const handleDelete = (id) => {
        // console.log(id);
        axios.delete(`${URL}/book?id=${id}`).then((res) => {
            toast("Book deleted!")
            getBookData()
        }).catch(() => {
            console.log("cannot delete");
        })
    }

    const handleEdit = (id, name, price, categoryId, description, image) => {
        navigate("/edit-book")
        localStorage.setItem("name" , name)
        localStorage.setItem("price" , price)
        localStorage.setItem("id" , id)
        localStorage.setItem("category" , categoryId)
        localStorage.setItem("description" , description)
        localStorage.setItem("image" , image)
    }

    const addBook = () => {
        navigate("/add-book")
    }

    const previousPage = () => {
        setIndex(index - 1)
        // console.log(index);
    }

    const nextPage = () => {
        setIndex(index + 1)
        // console.log(index);
    }

    return (
        <div className='backColor'>
            <div className='serchBox'>
                <Searchbar />
            </div>

            <div className='bookTitle'>
                <div className="bTitle">
                    <p>Book Page</p>
                </div>
            </div>

            <div className='addBtnBox'>
                <button className='addBtn' onClick={addBook}>Add book</button>
            </div>

            <div className='bookContainer'>
                <div>
                    <table className='table'>
                        <thead>
                            <tr className='tableTR'>
                                <th>Book Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookData?.map((e) => {
                                return <tr className='tableTR' key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.price}</td>
                                    <td>{e.category}</td>
                                    <td className='tableBtn'><button className='editBtn' onClick={() => handleEdit(e.id, e.name, e.price, e.categoryId, e.description, e.base64image)}>Edit</button> <button className='deleteBtn' onClick={() => handleDelete(e.id)}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='pageBtn'>
                <button onClick={previousPage} >&laquo; Previous</button>
                <button onClick={nextPage} id='nextBtn'>Next &raquo;</button>
            </div>


        </div>
    )
}

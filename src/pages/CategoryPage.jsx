import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function CategoryPage() {

    const [bookData, setBookData] = useState([])
    const [index, setIndex] = useState(1)
    const navigate = useNavigate()

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const getBookData = () => {
        axios.get(`${URL}/category?pageSize=10&pageIndex=${index}`).then((res) => {
            const data = res.data
            setBookData(data.result.items)
        })
    }

    useEffect(() => {
        getBookData()
    }, [index])

    const handleDelete = (id) => {
        // console.log(id);
        axios.delete(`${URL}/category?id=${id}`).then((res) => {
            toast("Category deleted!")
            getBookData()
        }).catch(() => {
            console.log("cannot delete");
        })
    }

    const handleEdit = (id, name) => {
        navigate("/edit-category")
        localStorage.setItem("name" , name)
        localStorage.setItem("id" , id)
    }

    const addBook = () => {
        navigate("/add-category")
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

            <div className='bookTitle'>
                <div className="bTitle">
                    <p> Category Page </p>
                </div>
            </div>

            <div className='addBtnBox'>
                <button className='addBtn categoryBtn' onClick={addBook}>Add Category</button>
            </div>

            <div className='bookContainer'>
                <div>
                    <table className='table'>
                        <thead>
                            <tr className='tableTR'>
                                <th>Category Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookData?.map((e) => {
                                return <tr className='tableTR' key={e._id}>
                                    <td>{e.name}</td>
                                    <td className='tableBtn'><button className='editBtn' onClick={() => handleEdit(e.id, e.name)}>Edit</button> <button className='deleteBtn' onClick={() => handleDelete(e.id)}>Delete</button></td>
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
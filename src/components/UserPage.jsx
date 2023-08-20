import React, {  useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function UserPage() {

    const [bookData, setBookData] = useState([])
    const [index, setIndex] = useState(1)
    const navigate = useNavigate()

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    const getBookData = () => {
        axios.get(`${URL}/user?pageSize=10&pageIndex=${index}`).then((res) => {
            const data = res.data
            setBookData(data.result.items)
        })
    }

    useEffect(() => {
        getBookData()
    }, [index])

    const handleDelete = (id) => {
        // console.log(id);
        axios.delete(`${URL}/user?id=${id}`).then((res) => {
            toast("User deleted!")
            getBookData()
        }).catch(() => {
            console.log("cannot delete");
        })
    }

    const handleEdit = (id, firstName, lastName, roleId, password, email) => {
        navigate("/edit-user")
        localStorage.setItem("firstName" , firstName)
        localStorage.setItem("lastName" , lastName)
        localStorage.setItem("id" , id)
        localStorage.setItem("roleId" , roleId)
        localStorage.setItem("password" , password)
        localStorage.setItem("email" , email)
    }

    const addBook = () => {
        navigate("/add-user")
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
                    <p>User Page</p>
                </div>
            </div>

            <div className='addBtnBox'>
                <button className='addBtn' onClick={addBook}>Add User</button>
            </div>

            <div className='bookContainer'>
                <div>
                    <table className='table'>
                        <thead>
                            <tr className='tableTR'>
                                <th>Name</th>
                                <th>Role</th>
                                <th>E-mail</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookData?.map((e) => {
                                return <tr className='tableTR' key={e._id}>
                                    <td>{e.firstName}</td>
                                    <td>{e.role}</td>
                                    <td>{e.email}</td>
                                    <td className='tableBtn'><button className='editBtn' onClick={() => handleEdit(e.id, e.firstName, e.lastName, e.roleId, e.password, e.email)}>Edit</button> <button className='deleteBtn' onClick={() => handleDelete(e.id)}>Delete</button></td>
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

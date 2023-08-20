import React, { useEffect, useState } from 'react'
import LoginAuth from '../authfile/LoginAuth'
import Searchbar from './Searchbar'
import axios from 'axios'
import Bookbox from './Bookbox'
import { toast } from 'react-toastify';

function BookList() {

  const [bookData, setBookData] = useState([])
  const [index, setIndex] = useState(1)

  const data = JSON.parse(localStorage.getItem("userInfo"))
  const userId = data.id
  
  const URL = "https://book-e-sell-node-api.vercel.app/api"

  useEffect(() => {
    getBookData()
  }, [index])

  const getBookData = () => {
    axios.get(`${URL}/book?pageSize=10&pageIndex=${index}`).then((res) => {
      const data = res.data
      setBookData(data.result.items)
    })
  }

  const addToCart = (bookId) => {
    // console.log("Item added in cart book " + bookId);
    // console.log("Item added in cart user " + userId);
    console.log(bookId)
    const payload = {
      bookId: bookId,
      userId: userId,
      quantity: 1
    }

    axios.post(`${URL}/cart`, payload).then((res) => {
      toast("Book added in cart")
    }).catch(() => {
      toast("Book not added")
    })

  }

  // console.log(bookData);

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
             <p>Books</p>
        </div>
      </div>

      <div className="bookContainer">
        <div className="bookBox">
          <div className='bookLine'>
            {bookData?.map((e) => {
              return <Bookbox key={e._id} id={e.id} addToCart={addToCart} name={e.name} price={e.price} description={e.description.slice(0, 50)} category={e.category} image={e.base64image} />
            })}
          </div>
        </div>
      </div>
      <div className='pageBtn'>
        <button onClick={previousPage} >&laquo; Previous</button>
        <button onClick={nextPage} id='nextBtn'>Next &raquo;</button>
      </div>
      
    </div>
  )
}

export default LoginAuth(BookList)

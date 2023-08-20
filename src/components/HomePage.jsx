import React from 'react'
import LoginAuth from '../authfile/LoginAuth'
//import book from '../images/BOOK.jpg'
//import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
//import Searchbar from './Searchbar'
// import {Link} from 'react-router-dom'
// import logo from '../logo.svg'
// import { Button } from '@mui/material'

function HomePage() {

  const navigate = useNavigate()

  const getstartBtn = () => {
    navigate("/books")
  }

  return (
    // <div>
    //   <div className='serchBox'>
    //     <Searchbar/>
    //   </div>
    //   <div className='container' >
    //     <div className="box1">
    //       <p className='para1'>
    //         WHAT <span>BOOK</span> ARE YOU LOOKING FOR?
    //       </p>
    //       <p className='para2'>Not sure what to read next? Get your new books with the best price.</p>
    //       <Button variant='contained' onClick={getstartBtn} >Get Started</Button>
    //     </div>
    //     <div className="box2">
    //       <img src={book} alt='img' />
    //     </div>
    //   </div>

    // </div>

    <> 
    <h1 className="homeHead"> My Book Store</h1>
    <div className="homeImg"></div>
   </> 
  )
}

export default LoginAuth(HomePage)
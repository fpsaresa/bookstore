import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import Searchbar from './Searchbar'
import { toast } from 'react-toastify'
import {AuthContext} from '../context/AuthContext'

function Cart() {

  const [cartData, setCartData] = useState([])
  const [cartIds, setCartIds] = useState([])
  const [quantity, setQuantity] = useState(1)
  // const [totalPrice, setTotalPrice] = useState(0)

  const context = useContext(AuthContext)

  const URL = "https://book-e-sell-node-api.vercel.app/api"

  const getCartData = () => {
    axios.get(`${URL}/cart?userId=${context.user.id}`).then((res) => {
      setCartData(res.data.result)
    }).catch(() => {
      console.log("cart data not found");
    })
  }

  useEffect(() => {
    getCartData()
  }, [])

  const removeCart = (id) => {
    // console.log(id);
    axios.delete(`${URL}/cart?id=${id}`).then((res) => {
      toast("Book removed from cart")
      getCartData()
    }).catch(() => {
      toast("Book not removed from cart");
    })
  }

  const updateCartData = (id, bookId, userId) => {

    const payload = {
      id : id,
      bookId: bookId,
      userId: userId,
      quantity: quantity
    }

    axios.put(`${URL}/cart`, payload).then((res) => {
      // toast("Book added in cart")
      console.log("quantity updated");
      getCartData()
    }).catch(() => {
      // toast("Book not added")
      console.log("not updated");
    })

  }

  const plusQuantity = (id, bookId, userId) => {
    setQuantity(quantity + 1)
     updateCartData(id, bookId, userId)
    // context.setTquantity(context.tquantity + 1)

  }

  const minusQuantity = (id, bookId, userId) => {
    if (quantity>= 1) {
      setQuantity(quantity - 1)
      updateCartData(id, bookId, userId)
      // context.setTquantity(context.tquantity - 1)
    }
  }

  const placeOrder = () => {

    const payload = {
      userId : context.user.id,
      cartIds : cartIds
    }
    // console.log(cartIds);

    axios.post(`${URL}/order`, payload).then((res) => {
      toast("Order placed!")
    }).catch(() => {
      toast("Order not placed")
    })

  }

  return (
    <div className='backColor'>
      <div className='serchBox'>
        <Searchbar />
      </div>

      <div className='bookTitle'>
        <div className="bTitle">
          <p>Cart Page</p>
        </div>
      </div>

      <div className="bookTitle">
        <div className="cartTitle">
        <div>
            <h4>Total items : {cartData.length}</h4>
          </div>
          <div>
            {/* <h4>Total price : {totalPrice} &#x20B9;</h4> */}
          </div>
        </div>

      </div>

      <div >{
        cartData?.map((e) => {
          cartIds.push(e.id)
          return <div key={e.book._id} className='bookContainer'>
            <div className="cartContainer">

              <div className='cartBox'>
                <div className="cartImage">
                  <img src={e.book.base64image} alt='book' />
                </div>
                <div className='cartItemsData'>
                  <h4>{e.book.name}</h4>
                  <p>{e.book.category}</p>
                  <div className='cartBtn'>
                    <button onClick={() => plusQuantity(e.id, e.bookId, e.userId)}><span className="material-symbols-outlined">
                      add
                    </span></button>
                    <button id='quantBtn'>
                      {e.quantity}</button>
                    <button onClick={() => minusQuantity(e.id, e.bookId, e.userId)}><span className="material-symbols-outlined">
                      remove
                    </span></button>
                  </div>
                </div>
              </div>

              <div className='cartRemove'>
                <h5>MRP &#x20B9; {e.book.price}</h5>
                <button className='removeCartBtn' onClick={() => removeCart(e.id)}>Remove</button>
              </div>

            </div>
          </div>
        })}

        <div className='bookTitle'>
          <button className='oredrBtn' onClick={placeOrder}>Place Order</button>
        </div>

      </div>
    </div>
    
  )
}

export default Cart;
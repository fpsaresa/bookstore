import React from 'react'

export default function Bookbox(props) {
  return (

    <div className="bookDataBox">
      <div className='bookImg'>
      <img src={props.image} alt='book' className='bookImg'/>
      </div>
      <div className="bData">
        <div className="bDataHeigth">
              <h3 className="inbox2">{props.name}</h3>
              <p className="inbox2">Category : {props.category}</p>
              <p className="inbox2">{props.description}...</p>
              <p className="inbox2">Price : <b>{props.price}  &#x20B9;</b></p>
        </div>
        <div className="bDataBtn">
          <button onClick={() => props.addToCart(props.id)} className='buyBtn'>Add to Cart</button>
        </div>      
      </div>
    </div>
  )
}

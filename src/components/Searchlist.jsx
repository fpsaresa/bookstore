import React from 'react'

export default function Searchlist(props) {

  return (
    <div>
      <div className='searchListData'>
        <div className="serchDataBox1">
          <h4>{props.name}</h4>
          <p>Price : <b>{props.price} Rs.</b></p>
          <p>{props.discription}...</p>
        </div>
        <div className="serchDataBox2">
          <button>ADD</button>
        </div>
      </div>
      <hr />
    </div>
  )
}

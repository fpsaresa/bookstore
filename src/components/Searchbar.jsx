import axios from 'axios'
import React, { useState } from 'react'
import Searchlist from './Searchlist'

export default function Searchbar() {

    const [searchTxt, setSearchTxt] = useState("")
    const [showItem, setShowItem] = useState(true)
    const [isData, setIsData] = useState(true)
    const [searchData, setSearchData] = useState([])

    const URL = `http://book-e-sell-node-api.vercel.app/api/book/search?keyword=${searchTxt}`

    const searchItems = () => {
        // console.log(searchTxt);
        if (showItem) {
            setShowItem(false)
        }else{
            setShowItem(true)
        }

        axios.get(URL).then((res) => {
            setSearchData(res.data)
        }).catch((err) => {
            console.log("Error in axios", err);
        })

        if (searchData.result?.length === 0) {
            setIsData(false)
        }else{
            setIsData(true)
        }

    }

    return (
        <div>
            <div className="serachItems">
                <input type="text" placeholder='Search here...' onChange={(e) => { setSearchTxt(e.target.value) }} value={searchTxt} />
                <button onClick={searchItems} >Search</button><br />
            </div>
            {isData ? 
            <div className="searchList" id={showItem ? "showSearchItem" : ""}>
                {searchData.result?.map((e) => {
                    return  <Searchlist key={e._id} id={e.id} name={e.name} price={e.price} discription={e.description.slice(0, 50)} category={e.category}/>
                })}
            </div> :  <div className="searchList noSearchData" id={showItem ? "showSearchItem" : ""}>
                <p>No data found!!</p>
            </div>
            }
        </div>

    )
}

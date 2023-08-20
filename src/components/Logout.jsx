import { useState } from 'react';
import Cookies from 'js-cookie';



const Logout = () => {
const [setUserData,  initialUserValue] = useState([])    
  setUserData(initialUserValue);
  localStorage.removeItem("userInfo")
  // navigate("/")
  Cookies.remove("userInfo"); 
};


export default Logout;
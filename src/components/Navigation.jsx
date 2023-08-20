import React from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {RoutePaths} from "../utils/enum";
import Login from "../pages/Login";
import BooksList from "./BooksList";
import HomePage from "./HomePage";
import Form1 from "./Form";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const AppRoutes = () => {
    const userContext = userContext(AuthContext);
    const data = Cookies.get("userInfo");
    const navigate = useNavigate();

    const userInfo = JSON.parse(data);
    console.log(userContext.userData);

    return (
        <Routes>
           <Route exact path={"/"} element={<Login />} />
           <Route exact path="/home" element={<HomePage />}  />
           <Route exact path="/books" element={userInfo.email ? <BooksList /> : <>{navigate("/")}</>} />
           <Route exact path="/form" element={<Form1/>} />
           <Route exact path="*" element={<PageNotFound />}  />
        </Routes>
    );
};

export default AppRoutes;
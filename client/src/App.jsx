import { Route, Routes } from "react-router";

import Navbar from "./components/navbar/Navbar.jsx";
import Calculator from "./components/calculator/Calculator.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkMe } from "./store/slices/authSlice.js";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkMe());
    }, [dispatch]);

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/check-auth" element={<Home />} />
            </Routes>
        </>
    )
}

export default App

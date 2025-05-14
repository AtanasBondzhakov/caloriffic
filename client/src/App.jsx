import { Route, Routes } from "react-router";

import Navbar from "./components/navbar/Navbar.jsx";
import Calculator from "./components/calculator/Calculator.jsx";
import Home from "./components/home/Home.jsx";
import SignUp from "./components/auth/sign-up/SignUp.jsx";
import Login from "./components/auth/login/Login.jsx";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default App

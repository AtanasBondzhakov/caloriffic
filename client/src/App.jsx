import { Route, Routes } from "react-router";

import Navbar from "./components/navbar/Navbar.jsx";
import Calculator from "./components/calculator/Calculator.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkMe } from "./store/slices/authSlice.js";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import ManageUsers from "./components/admin/manage-users/ManageUsers.jsx";
import Products from "./components/products/Products.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkMe());
    }, [dispatch]);

    return (
        <div style={{ display: 'flex', height: 'auto', minHeight: '100vh' }}>
            {/* <Navbar /> */}
            <Sidebar />
            {/* <main style={{ display: 'flex', flexDirection: 'row' }}> */}
            {/* <Sidebar /> */}
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/products" element={<Products />} />
                {/* <Route path="/auth/check-auth" element={<Home />} /> */}
                {/* <Route path="/admin/users-list" element={<UsersList />} /> */}
            </Routes>
            {/* </main> */}
        </div>
    )
}

export default App

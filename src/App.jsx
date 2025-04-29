import { Route, Routes } from "react-router";

import Navbar from "./components/navbar/Navbar.jsx";
import Calculator from "./components/calculator/Calculator.jsx";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/calculator" element={<Calculator />} />
            </Routes>
        </>
    )
}

export default App

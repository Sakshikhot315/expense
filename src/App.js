import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chart from "./pages/Chart";



function App() {
  return (
    <>
   <BrowserRouter>
   <Routes>

   <Route path="/" element={<Login/>}></Route>

   <Route path="/register" element={<Register/>}></Route>

    <Route path="/home" element={<Home/>}></Route>

    <Route path="/chart" element={<Chart/>}></Route>

   </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;

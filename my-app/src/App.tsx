import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import DefaultLayout from "./components/containers/default";
import Products from "./pages/products";
import AddProduct from "./components/addProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

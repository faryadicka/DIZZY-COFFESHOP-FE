import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Component
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Product from "./pages/Product/Product";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

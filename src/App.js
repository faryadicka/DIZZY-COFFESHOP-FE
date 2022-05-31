import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/Forgot/Forgot";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:favorite" element={<Product />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

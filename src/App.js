import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/store"

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/Forgot/Forgot";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment";
import PrivateElement from "./components/PrivateElement/PrivateElement";
import NewProduct from "./pages/NewProduct/NewProduct";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<NewProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:favorite" element={<Product />} />
          <Route path="/products/detail/:id" element={<ProductDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/payment" element={
            <PrivateElement redirectTo="/products/detail/:id" extraData={{ isAuthenticated: false }}>
              <Payment />
            </PrivateElement>} />
          <Route path="/profile" element={
            <PrivateElement redirectTo="/login" extraData={{ isAuthenticated: false }}>
              <Profile />
            </PrivateElement>} />
          <Route path="*" element={<><h1>PAGE 404</h1></>} />
        </Routes>
      </Router>
    </ReduxProvider>
  );
}

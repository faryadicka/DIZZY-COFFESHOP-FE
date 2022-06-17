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
import PublicElement from "./components/PublicElement/PublicElement";
import NewProduct from "./pages/NewProduct/NewProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import NewPromo from "./pages/NewPromo/NewPromo";

export default function App() {
  // const token = localStorage.getItem("token")
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/create" element={<NewProduct />} />
          <Route path="/promos/create" element={<NewPromo />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/login" element={
            <PublicElement redirectTo="/">
              <Login />
            </PublicElement>} />
          <Route path="/register" element={
            <PublicElement redirectTo="/">
              <Register />
            </PublicElement>} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:favorite" element={<Product />} />
          <Route path="/products/detail/:id" element={<ProductDetail />} />
          <Route path="/history" element={
            <PrivateElement redirectTo="/login" extraData={{ isAuthenticated: false }}>
              <History />
            </PrivateElement>} />
          <Route path="/payment" element={
            <PrivateElement redirectTo="/login" extraData={{ isAuthenticated: false }}>
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

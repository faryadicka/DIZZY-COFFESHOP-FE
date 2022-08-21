import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store"

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/Forgot/Forgot";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import History from "./pages/History/Histories";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment.jsx";
import PrivateElementLogin from "./components/PrivateElement/PrivateElementLogin.jsx";
import PublicElement from "./components/PublicElement/PublicElement";
import CreateProduct from "./pages/CreateProduct/NewProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import CreatePromo from "./pages/CreatePromo/CreatePromo";
import EditPromo from "./pages/EditPromo/EditPromo";
import NotFound from "./pages/404/NotFound";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/create" element={
              <PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
                <CreateProduct />
              </PrivateElementLogin>} />
            <Route path="/promos/create" element={
              <PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
                <CreatePromo />
              </PrivateElementLogin>} />
            <Route path="/products/edit/:id" element={<PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
              <EditProduct />
            </PrivateElementLogin>} />
            <Route path="/promos/edit/:id" element={<PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
              <EditPromo />
            </PrivateElementLogin>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
              <PublicElement redirectTo="/">
                <Register />
              </PublicElement>} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:favorite" element={<Products />} />
            <Route path="/products/detail/:id" element={<ProductDetail />} />
            <Route path="/history" element={
              <PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
                <History />
              </PrivateElementLogin>} />
            <Route path="/payment" element={
              <PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
                <Payment />
              </PrivateElementLogin>} />
            <Route path="/profile" element={
              <PrivateElementLogin redirectTo="/login" extraData={{ isAuthenticated: false }}>
                <Profile />
              </PrivateElementLogin>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </ReduxProvider>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./App.scss"
import OurStore from "./pages/OurStore";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import WishLish from "./pages/WishList";
import ChangePassword from "./component/ChangePassword";
import Myprofile from "./component/MyProfile";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./pages/Checkout";
import Purchase from "./component/Purchase";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import Dashboard from "./component/admins/Dashboard";
import Customer from "./component/admins/Customer";
import Add from "./component/admins/Add";
import AddBlog from "./component/admins/AddBlog";
import BlogList from "./component/admins/BlogList";
import Enquiries from "./component/admins/Enquiries";
import Order from "./component/admins/Order";
import ProductList from "./component/admins/ProductList";
import ColorList from "./component/admins/ColorList";
import BrandList from "./component/admins/BrandList";

const NotFound = () => {
  return (
    <div className='container mt-3 alert alert-danger'>
      404. Not found data with current URL
    </div>
  )
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/our-store" element={<OurStore />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wish-list" element={<WishLish />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:slug" element={<DetailProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* <Route path="/checkout/shipping" element={<Shipping />} /> */}
            <Route path="/user" element={<Profile />} >
              <Route index path="account" element={<Myprofile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="Purchase" element={<Purchase />} />
            </Route>

          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customer />} />
            <Route path="add" element={<Add />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="brand-list" element={< BrandList />} />
            <Route path="category-list" element={<ProductList />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="orders" element={<Order />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="blogs-list" element={<BlogList />} />
            <Route path="enquiries" element={<Enquiries />} />
          </Route>
          <Route path='*' element={<NotFound />} />

        </Routes>
      </BrowserRouter >
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

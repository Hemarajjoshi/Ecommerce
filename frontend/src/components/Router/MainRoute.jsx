import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Items from "../pages/Items";
import NewItems from "../pages/NewItems";
import Profile from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ProfileDropdown from "../pages/ProfileDropdown";
import AddProduct from "../pages/AddProduct";


export default function MainRoute() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/items" element={<Items />} />
        <Route path="/new-items" element={<NewItems />} />
        <Route path="/profile" element = {<Profile/>}/>
        <Route path= "/signin" element = {<Signin/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
      </Routes>
  );
}

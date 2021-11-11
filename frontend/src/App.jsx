import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {useSelector} from 'react-redux'
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import "./App.css";
import Success from "./pages/Success";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  console.log(user)
  return (
    <Router>
      <Announcement />
      <Navbar />
      <Switch>
        <Route exact path="/shop">
          <Home />
        </Route>
        <Route path="/shop/products">
          <ProductList />
        </Route>
        <Route path="/shop/products/:category">
          <ProductList />
        </Route>
        <Route path="/shop/product/:id">
          <Product />
        </Route>
        <Route path="/shop/cart">
          <Cart />
        </Route>
        <Route path="/shop/success">
          <Success />
        </Route>
        <Route path="/shop/login">
          {user ? <Redirect to="/shop" /> : <Login />}
        </Route>
        <Route path="/shop/register">
          {user ? <Redirect to="/shop" /> : <Register />}
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
};

export default App;

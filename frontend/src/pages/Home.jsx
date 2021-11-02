import React from "react";

import Categories from "../components/Categories";

import Products from "../components/Products";
import Slider from "../components/Slider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>

      <Slider />
      <Categories />
      <Products />
      
    </div>
  );
};

export default Home;

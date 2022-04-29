import React from "react";
import NavigationBar from "../NavigationBar/Navbar";
import ImageSection from "./components/ImageSection";
import FoodHomePage from "./components/FoodHomePage";
import Footer from "../Footer/Footer";

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <ImageSection />
      <FoodHomePage />
      <Footer />
    </>
  );
};

export default HomePage;

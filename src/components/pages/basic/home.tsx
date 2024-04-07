import HeroSection from "../../herosection";
import Content from "../../content";
import ArticleList from "./articlelist";
import MapImage from "../../mapimage";
import ShopList from "./shoplist";
import Navbar from "./navbar";
import MyMapComponent from "../../maps/maps";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      window.location.href = "./signedin_home";
    }
  });
  return (
    <>
      <Navbar />

      <HeroSection
        title="Unlock Exclusive Offers with AI-Powered Recommendations"
        description="Uncover global treasures, AI magic recommends shops with exclusive deals. Explore top-rated spots effortlessly."
        imageSrc="src\assets\image.png"
        imageAlt="A person using a smartphone to explore exclusive offers"
        ctaText="Explore"
        ctaColor="bg-sky-600"
      />
      <Content
        title="Unveiling Hidden Retail Tales"
        description="Explore unique narratives from shoppers worldwide, guiding you to extraordinary retail experiences and exclusive finds."
        linkText="See More"
        linkColor="text-sky-600"
      />
      <ArticleList />
      {/* <MapImage /> */}
      <MyMapComponent />
      <ShopList />
    </>
  );
}

export default Home;

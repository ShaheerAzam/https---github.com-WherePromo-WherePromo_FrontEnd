import HeroSection from "../../herosection";
import Content from "../../content";
import Signedin_ArticleList from "./signedin_articlelist";
import MapImage from "../../mapimage";
import Signedin_Navbar from "./signedin_navbar";
import Signedin_ShopList from "./signedin_shoplist";
import MyMapComponent from "../../maps/maps";

function Signedin_Home() {
  return (
    <>
      <Signedin_Navbar />

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
      <Signedin_ArticleList />
      {/* <MapImage /> */}
      <MyMapComponent />
      <Signedin_ShopList />
    </>
  );
}

export default Signedin_Home;

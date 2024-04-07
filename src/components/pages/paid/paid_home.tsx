import HeroSection from "../../herosection";
import Content from "../../content";
import Signedin_ArticleList from "../signedin/signedin_articlelist";
import MapImage from "../../mapimage";
import Paid_Navbar from "./paid_navbar";
import Signedin_ShopList from "../signedin/signedin_shoplist";
import MyMapComponent from "../../maps/maps";

function Paid_Home() {
  return (
    <>
      <Paid_Navbar />

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

export default Paid_Home;

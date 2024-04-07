import Admin_Navbar from "./admin_navbar";
import ProductCard from "./detailed_scrapped_site_card";


function ScrapedSiteDetail() {

    const productData = [
  {
    imageUrl: 'https://picsum.photos/200/300',
    products: [
      { name: 'Product 1', description: '...', price: 19.99, quantity: 2 },
      { name: 'Product 2', description: '...', price: 9.99, quantity: 1 },
    ],
  },

    {
    imageUrl: 'https://picsum.photos/200/300',
    products: [
      { name: 'Product 1', description: '...', price: 19.99, quantity: 2 },
      { name: 'Product 2', description: '...', price: 9.99, quantity: 1 },
    ],
  },

];

return (
    <div>
    <Admin_Navbar/>
    <h1 style={{
        fontSize:"200%",
        padding:"10px",
        margin:"10px",
        marginLeft:"20px",
        fontWeight:"bold",
    }}>Flyer with Extracted Data</h1>
    {productData.map((product) => (
        
        <ProductCard key={product.imageUrl} {...product} />
      ))}
      </div>
)
}

export default ScrapedSiteDetail;
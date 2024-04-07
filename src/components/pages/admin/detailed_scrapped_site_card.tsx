import './product-card.css';

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CardProps {
  imageUrl: string;
  products: Product[];
}

const ProductCard: React.FC<CardProps> = ({ imageUrl, products }) => {
  return (
    <div className="product-card">
        
      <img src={imageUrl} alt="Product" />
      <br></br>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Design</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.quantity}</td>
            <td>${product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ProductCard;

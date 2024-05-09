import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="product-card my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text as="h3">
          <strong>${product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

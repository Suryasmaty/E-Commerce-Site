import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
//import axios from "axios";

const Product = ({ product }) => {
  return (
    <Card className="product-card my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">
          <strong>${product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
/*
export async function productLoader(params) {
  const id = params.productId;

  const response = await axios.get("http://localhost:5000/api/products/" + id);

  return response;
}
*/

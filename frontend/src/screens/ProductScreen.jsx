import { Link, useLoaderData, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import products from "../products";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { useState } from "react";

const ProductScreen = () => {
  //const { data } = useLoaderData();
  const { productId } = useParams();
  //console.log(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message || error.error}</Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/product">
            Go Back
          </Link>

          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Price:</strong> ${product.price}
                </ListGroupItem>

                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>

            <Col>
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(event) =>
                              setQty(Number(event.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

export async function productLoader({ params }) {
  const id = params.productId;

  const response = await axios.get("http://localhost:5000/api/products/" + id);

  return response;
}

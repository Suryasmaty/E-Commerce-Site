import { Row, Col } from "react-bootstrap";
//import productss from "../products";
import Product from "../components/Product";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
//import { json } from "react-router-dom";
//import { useEffect, useState } from "react";

const HomeScreen = () => {
  const { data } = useLoaderData();
  const products = data;

  //const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("http://localhost:5000/api/products/");
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xl={3} lg={3} md={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

export async function loader() {
  const response = await axios.get("http://localhost:5000/api/products");
  // console.log(response);
  // if (!response.status === 200) {
  // } else {
  //   const resData = await response.json();
  //   return JSON.parse(resData);
  // }

  console.log(response);
  return response;
}

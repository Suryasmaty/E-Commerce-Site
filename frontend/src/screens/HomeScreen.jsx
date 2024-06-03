import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
//import products from "../products";
//import { useLoaderData } from "react-router-dom";
//import { json } from "react-router-dom";
//import { useEffect, useState } from "react";

const HomeScreen = () => {
  // const { data: products, isLoading } = useLoaderData();
  // console.log(isLoading);
  // //const products = data;
  // const x = useLoaderData();
  // console.log(x);

  const { data: products, isLoading, error } = useGetProductsQuery();
  //console.log(products);

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
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <h1>Unable to fetch data</h1>
        </Message>
      ) : (
        <>
          {" "}
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xl={3} lg={3} md={4} sm={6}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
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

  //console.log(response);
  return response;
}

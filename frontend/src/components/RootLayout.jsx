import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default RootLayout;

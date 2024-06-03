import HomeScreen, { loader } from "./screens/HomeScreen";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "./screens/ErrorScreen";
import ProductScreen from "./screens/ProductScreen";
import { loader as productsLoader } from "./screens/HomeScreen";
import { productLoader } from "./screens/ProductScreen";
import OffersScreen from "./screens/OffersScreen";

import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "product",
        //loader: productsLoader,
        children: [
          {
            index: true,
            element: <HomeScreen />,
            //loader: loader
          },
          {
            path: ":productId",
            //loader: productLoader,
            element: <ProductScreen />,
          },
        ],
      },
      {
        path: "offers",
        element: <OffersScreen />,
      },
      {
        path: "cart",
        element: <CartScreen />,
      },
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },

      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/shipping",
            element: <ShippingScreen />,
          },
          {
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrderScreen />,
          },
          {
            path: "/order/:id",
            element: <OrderScreen />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <PayPalScriptProvider deferLoading={false}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  );
}

export default App;

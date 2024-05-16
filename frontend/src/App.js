import HomeScreen, { loader } from "./screens/HomeScreen";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "./screens/ErrorScreen";
import ProductScreen from "./screens/ProductScreen";
import { loader as productsLoader } from "./screens/HomeScreen";
import { productLoader } from "./screens/ProductScreen";
import OffersScreen from "./screens/OffersScreen";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "product",
        loader: productsLoader,
        children: [
          { index: true, element: <HomeScreen />, loader: loader }, //loader: loader
          {
            path: ":productId",
            loader: productLoader,
            element: <ProductScreen />,
          },
        ],
      },
      {
        path: "offers",
        element: <OffersScreen />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

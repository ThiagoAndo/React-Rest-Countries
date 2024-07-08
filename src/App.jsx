import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import CountryDetail, {
  loader as countryDetailLoader,
} from "./pages/CountryDetail";
import HomePage, { loader as countriesLoader } from "./pages/Home";
import RootLayout from "./pages/Root";
import { useContext } from "react";
import { ModeAction } from "./store/context/mode";

const router = createBrowserRouter([
  {
    path: "/",
    id: "main",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: countriesLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":countName",
        element: <CountryDetail />,
        loader: countryDetailLoader,
      },
    ],
  },
]);

function App() {
  const mode = useContext(ModeAction);
  return <RouterProvider router={router} />;
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import CountryDetail, {
  loader as countryDetailLoader,
} from "./pages/CountryDetail";
import HomePage, { loader as countriesLoader } from "./pages/Home";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/React-Rest-Countries",
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
  return <RouterProvider router={router} />;
}

export default App;

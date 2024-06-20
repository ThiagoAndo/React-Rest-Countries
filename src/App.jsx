import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import CountryDetail, {
  loader as countryDetailLoader,
  action as deleteEventAction,
} from "./pages/CountryDetail";
import HomePage, { loader as countriesLoader } from "./pages/Home";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    id: "event-detail",

    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: countriesLoader,
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

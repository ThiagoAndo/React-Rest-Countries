import { useRouteLoaderData } from "react-router-dom";

function CountryDet(country) {
  const { countries } = useRouteLoaderData("main");
  console.log(countries);
  console.log("useRouteLoaderData");
  // return <h1>{country.name.common}</h1>;
}

export default CountryDet;

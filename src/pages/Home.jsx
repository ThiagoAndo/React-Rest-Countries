import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import CountryList from "../components/CountryList";
function HomePage() {
  const { coutries } = useLoaderData();
  console.log(coutries);

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={coutries}>
        {(loadedEvents) => <CountryList countries={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default HomePage;

async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader() {
  return defer({
    coutries: loadCountries(),
  });
}

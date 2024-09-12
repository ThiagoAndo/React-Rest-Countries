import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { useEffect } from "react";
import CountryDetailed from "../components/conutryComponents/Detailed";
import { Triangle } from "react-loader-spinner";

function CountryDetail() {
  const { country } = useLoaderData();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <div id="loading">
            <Triangle
              visible={true}
              height="300"
              width="300"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        }
      >
        <Await resolve={{ country }}>
          {(loadedCount) => <CountryDetailed country={loadedCount} />}
        </Await>
      </Suspense>
    </>
  );
}

export default CountryDetail;

async function loadCountry(name) {
  const response = await fetch(
    ` https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader({ request, params }) {
  const name = params.countName;

  return defer({
    country: await loadCountry(name),
  });
}

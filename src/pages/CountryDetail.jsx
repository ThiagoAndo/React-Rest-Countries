import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { useEffect } from "react";
import CountryDetailed from "../components/countryComponents/Detailed";
import { Triangle } from "react-loader-spinner";
import { fetchByCode } from "../helpers/HTTP";

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

async function loadCountry(code) {
  const response = await fetchByCode(code);
  console.log(response);
  if (response === undefined) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response;
    return resData;
  }
}

export async function loader({ request, params }) {
  const name = params.countName;

  return defer({
    country: await loadCountry(name),
  });
}

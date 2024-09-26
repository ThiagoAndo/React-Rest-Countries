import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { useEffect } from "react";
import Detailed from "../components/countryComponents/Detailed";
import { Triangle } from "react-loader-spinner";

function DistrictDetail() {
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
          {(loadedCount) => <Detailed country={loadedCount} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DistrictDetail;


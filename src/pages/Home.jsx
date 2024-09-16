import { Suspense } from "react";
import { useRouteLoaderData, json, Await } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClockContext } from "../store/context/clock";
import CountryList from "../components/countryComponents/CountryList";
import { Triangle } from "react-loader-spinner";
import RegionProvider from "../store/context/fetchRegion";
import { useSelector } from "react-redux";
import { loadCountries, useGetLocationName } from "../helpers/HTTP";
function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const context = useContext(ClockContext);
  const { countries } = useRouteLoaderData("main");
  context.stop();
   useGetLocationName();
console.log("HOME RENDERED")
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    let timer1 = setTimeout(
      () => {
        localStorage.setItem("position", scrollPosition);
      },

      200
    );
    return () => {
      clearTimeout(timer1);
    };
  }, [scrollPosition]);

  useEffect(() => {
    // dispatch(locAction.setLoc({ lon: null, lat: null }));
    // userLocationData.lon === null ? setUpUserLocation() : null;

    let position = localStorage.getItem("position");
    if (!position) {
      position = window.scrollY;
    }
    window.scrollTo({
      top: position,
    });
    localStorage.removeItem("position");
    setInterval(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 500);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
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
      <Await resolve={countries}>
        {(loadedEvents) => (
          <RegionProvider>
            <CountryList countries={loadedEvents} />
          </RegionProvider>
        )}
      </Await>
    </Suspense>
  );
}

export default HomePage;

// async function loadCountries() {
//   const response = await fetch("https://restcountries.com/v3.1/all");

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch countries." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData;
//   }
// }

export async function loader() {
  return {
    countries: loadCountries(),
  };
}

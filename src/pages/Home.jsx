import { Suspense } from "react";
import { useRouteLoaderData, json, defer, Await } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClockContext } from "../store/context/clock";
import CountryList from "../components/CountryList";
function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const { countries } = useRouteLoaderData("main");
  const context = useContext(ClockContext);
  context.stop();

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
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={countries}>
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
    countries: loadCountries(),
  });
}

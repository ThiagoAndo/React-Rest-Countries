import { useRouteLoaderData, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Clock from "../clock/Clock";
import Borders from "./Borders";
import ForecastApp from "../foreCastApp/ForecastApp";
import { Triangle } from "react-loader-spinner";
import { ModeAction } from "../../store/context/mode";
import { prepareData, findBorders } from "../../helpers/prepareData";
import { useSelector } from "react-redux";
function CountryDetailed({ country }) {
  const hasPosition = useLocation().state;
  const locDetail = useSelector((state) => state?.location?.locDetail);
  let places = null;

  const context = useContext(ModeAction);
  const { countries } = useRouteLoaderData("main");
  const [thisCountries, setCoutries] = useState();

  let {
    country: [count],
  } = country;
  const [lag, crr, capital, subReg, cca2] = prepareData(country);
  if (hasPosition) {
    places = { try: locDetail?.city, try_2: capital, country: cca2 };
  } else {
    places = { try: capital, country: cca2 };
  }

  let bordersArray = [];
  if (count.borders && thisCountries) {
    bordersArray = findBorders(count, thisCountries);
  }
  useEffect(() => {
    if (!thisCountries) {
      async function parse() {
        const data = await countries;
        setCoutries(data);
      }
      parse();
    }
  }, []);

  if (thisCountries === null) {
    return (
      <div id="loading">
        <Triangle
          visible={true}
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  } else {
    return (
      <section id="expand">
        <div>
          <div>
            <Link
              to={"/"}
              className={context.mode ? "btnExp light" : "btnExp dark"}
            >
              <span>⬅ </span>
              <span>Back</span>
            </Link>
          </div>
          <div id="contExp">
            <div
              id="flag"
              style={{ backgroundImage: `url(${count.flags.png})` }}
            ></div>
            <div id="holdInf">
              <div className="inf">
                <h1>{count.name.common}</h1>
                <p>
                  <strong>Population: </strong>
                  {count.population}
                </p>
                <p>
                  <strong>Region: </strong>
                  {count.region}
                </p>
                <p>
                  <strong>subregion: </strong>
                  {subReg}
                </p>
                <p>
                  <strong>Capital: </strong>
                  {capital}
                </p>
              </div>
              <div className="inf">
                <h1> </h1>
                <h1> </h1>
                <p>
                  <strong>Top Level Domain: </strong>
                  {count.tld}
                </p>
                <p>
                  <strong>Currencies: </strong>
                  {crr}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {lag}
                </p>
              </div>
              {bordersArray.length > 0 ? (
                <div id="border">
                  <span id="noBtn">
                    <strong>Border countries: </strong>
                  </span>
                  <div id="btnBor">
                    {bordersArray.map((brds) => (
                      <Borders key={brds.id} id={brds.id} name={brds.name} />
                    ))}
                  </div>
                </div>
              ) : null}
              <ThisForeApp
                key={cca2}
                hasPosition={hasPosition}
                capital={capital}
                cca2={cca2}
                places={places}
              />
              <Clock
                cca2={count.cca2}
                name={count.name.common}
                capital={
                  hasPosition ? places.try : capital[0].replace(" ", "_")
                }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function ThisForeApp({ hasPosition, capital, cca2, places }) {
  return (
    <div className="weather_cont">
      <ForecastApp
        cap={{ ...places }}
        call={hasPosition != null ? { county: true } : { country: true }}
      />
    </div>
  );
}

export default CountryDetailed;

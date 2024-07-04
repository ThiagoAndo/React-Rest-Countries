import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Clock from "./clock/Clock";
import Borders from "./Borders";
import ForecastApp from "./ForecastApp";
function Detailed({ country }) {
  let {
    country: [count],
  } = country;
  let bordersArray = [];
  const { countries } = useRouteLoaderData("main");
  const [thisCountries, setCoutries] = useState();
  let crrKey;
  let crr = "No";
  let lag = "No";
  let langKey;
  let subReg = "No";
  let capital = "No";
  if (count?.currencies) {
    crrKey = Object.keys(count.currencies)[0];
    crr = count.currencies[crrKey].name;
  }

  if (count?.languages) {
    langKey = Object.keys(count?.languages)[0];
    lag = count?.languages[langKey];
  }

  if (count?.subregion) {
    subReg = count.subregion;
  }

  if (count?.capital) {
    capital = count.capital;
  }

  let findCountryName = (cca3, data) => {
    let count = -1;
    do {
      count++;
    } while (data[count].cca3 !== cca3);
    return data[count].name.common;
  };

  if (count.borders && thisCountries) {
    for (let index = 0; index < count.borders.length; index++) {
      let name = findCountryName(count.borders[index], thisCountries);
      let longName = "";

      if (name.length > 10) {
        for (let index = 0; index <= 10; index++) {
          if (index <= 9) {
            longName += name[index];
          } else if (index === 10) {
            longName += " ...";
          }
        }
        bordersArray.push({ id: name, name: longName });
      } else {
        bordersArray.push({ id: name, name });
      }
    }
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
      <h1 style={{ color: "red", fontFamily: "5rem", margin: "auto" }}>
        Loading...
      </h1>
    );
  } else {
    return (
      <section id="expand">
        <div>
          <Link to={"/React-Rest-Countries"} className="btnExp dark">
            <span>⬅ </span>
            <span>Back</span>
          </Link>
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
              <ForecastApp cap={capital} />
              <Clock
                cca2={count.cca2}
                name={count.name.common}
                capital={capital[0].replace(" ", "_")}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Detailed;

import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
function Detailed({ country }) {
  let {
    country: [count],
  } = country;

  console.log("count")
  console.log(count);
  const { countries } = useRouteLoaderData("main");

  const [thisCountries, setCoutries] = useState();
  let currencie;
  let crr;
  let lang;
  let lag;
  let subReg;
  let capital;
  currencie = Object.keys(count.currencies)[0];
  lang = Object.keys(count.languages)[0];
  lag = count.languages[lang];
  crr = count.currencies[currencie].name;
  subReg = count.subregion;
  capital = count.capital;

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
        <div class="dark">
          <div class="btnExp dark">
            <span>⬅</span>
            <span> Back</span>
          </div>
          <div id="contExp">
            <div
              id="flag"
              style={{ backgroundImage: `url(${count.flags.png})` }}
            ></div>
            <div id="holdInf">
              <div class="inf">
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
                  <strong>subregion :</strong>
                  {subReg}
                </p>
                <p>
                  <strong>Capital :</strong>
                  {capital}
                </p>
              </div>
              <div class="inf">
                <h1> </h1>
                <p>
                  <strong>Top Level Domain :</strong>
                  {count.tld}
                </p>
                <p>
                  <strong>Currencies :</strong>
                  {crr}
                </p>
                <p>
                  <strong>Languages :</strong>
                  {lag}
                </p>
              </div>
              <div id="border">
                <span id="noBtn">
                  <strong>Border countries :</strong>
                </span>
                <div id="btnBor">{/* ============================ */}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Detailed;

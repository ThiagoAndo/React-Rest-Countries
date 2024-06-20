// import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";
import CountryItem from "./CountryItem";
function CountryList({ countries }) {
  console.log(countries);
  let coutrySort = countries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );
  // const events = useLoaderData();

  return (
    <>
      <section id="srch" className="marg">
        <form role="search-role" id="form" autocomplete="off">
          <div className="autocomplete">
            <input
              className="dark"
              type="text"
              autocomplete="false"
              id="myInput"
              name="myCountry"
              placeholder="&#61442; Search for a country..."
              aria-label="Search through the content of the site"
            />
          </div>
        </form>
        <form action="/" id="formSelec">
          <select name="type" className="dark">
            <option value="" disabled selected hidden>
              Filter by Region
            </option>
            <option Africa="education">Africa</option>
            <option value="Americas" name="reg">
              America
            </option>
            <option value="Asia" name="reg">
              Asia
            </option>
            <option value="Europe" name="reg">
              Europe
            </option>
            <option value="Oceania" name="reg">
              Oceania
            </option>
            <option value="all" name="all">
              All Countries
            </option>
          </select>
        </form>
      </section>
      {coutrySort.map((cou) => (
        <CountryItem key={cou.name.common} country={cou} />
      ))}
    </>
  );
}
export default CountryList;

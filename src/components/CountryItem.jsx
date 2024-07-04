import { Link } from "react-router-dom";

function CountryItem({ country }) {
  return (
    <Link to={`/React-Rest-Countries/${country.name.common}`}>
      <article className="dark" id={country.name.common}>
        <div style={{ backgroundImage: `url(${country.flags.png})` }}> </div>
        <div>
          <div className="infoBox">
            <h3>{country.name.common}</h3>
            <p>
              <strong>Population: </strong>
              {country.population}
            </p>
            <p>
              <strong>Region: </strong>
              {country.region}
            </p>
            <p>
              <strong>Capital: </strong>
              {country.capital}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default CountryItem;

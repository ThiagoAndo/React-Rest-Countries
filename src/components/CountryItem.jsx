import { Link, useSubmit } from "react-router-dom";

function CountryItem({ country }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <Link to={`/${country.name.common}`}>
      <article class="dark" id={country.name.common}>
        <div style={{ backgroundImage: `url(${country.flags.png})` }}> </div>
        <div>
          <div class="infoBox">
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

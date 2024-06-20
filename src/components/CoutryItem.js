import { Link, useSubmit } from "react-router-dom";


function CoutryItem({ country }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article class="dark" id={country.name.common}>
      <div style={{ backgroundImage: `url(${country.flags.png})` }}> </div>
      <div>
        <div class="infoBox">
          <h3>{country.name.common}</h3>
          <p>
            <strong>Population:</strong>&nbsp {country.population}
          </p>
          <p>
            <strong>Region:</strong>&nbsp {country.region}
          </p>
          <p>
            <strong>Capital:</strong>&nbsp {country.capital}
          </p>
        </div>
      </div>
    </article>
  );
}

export default CoutryItem;

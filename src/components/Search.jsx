function Search(){
    return (
      <section id="srch" className="marg">
        <form role="search-role" id="form" autoComplete="off">
          <div className="autocomplete">
            <input
              className="dark"
              type="text"
              autoComplete="false"
              id="myInput"
              name="myCountry"
              placeholder="&#61442; Search for a country..."
              aria-label="Search through the content of the site"
            />
          </div>
        </form>
        <form action="/" id="formSelec">
          <select name="type" className="dark" defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>
              Filter by Region
            </option>
            <option value="Africa" name="reg">
              Africa
            </option>
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
    );
}

export default Search
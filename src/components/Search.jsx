import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ModeAction } from "../store/context/mode";
import { useContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Search() {
  const context = useContext(ModeAction);
  const { countries } = useRouteLoaderData("main");
  const [coutry, sentCountry] = useState();
    const navigate = useNavigate();
  async function resolveCoutries(con) {
    let count = await con;
    
    count = count.map((cnt) => {
      const obj = {};
      obj.id = cnt.altSpellings[0];
      obj.name = cnt.name.common;
      return obj
    });
    sentCountry(count);
  }

  useEffect(() => {
    resolveCoutries(countries);
  }, []);

  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <span className="result-span">{item.name}</span>
      </div>
    );
  };
  const handleOnSelect = (item) => {
    navigate(`/${item.name}`);
    console.log(item.name);
  };

  return (
    <section id="srch" className="marg">
      <ReactSearchAutocomplete
        className={"form"}
        items={coutry}
        onSelect={handleOnSelect}
        formatResult={formatResult}
        onKeyDown={(e) => {
          hadleKey(e);
        }}
        placeholder={"Search for a country..."}
        autoFocus
        styling={{
          height: "39px",
          border: context.mode ? "1px solid black" : "1px solid white",
          borderRadius: "8px",
          backgroundColor: context.mode ? "#ffffff" : "#202c37",
          hoverBackgroundColor: "#ff9b05",
          color: context.mode ? "black" : "white",
          fontSize: "20px",
          iconColor: context.mode ? "black" : "white",
          lineColor: "#f9b241",
          placeholderColor: context.mode ? "black" : "white",
          clearIconMargin: "3px 8px 0 0",
          zIndex: "2",
        }}
      />
      {/* <form role="search-role" id="form" autoComplete="off">
        <div className="autocomplete">
          <input
            className={context.mode ? "light" : "dark"}
            style={
              context.mode
                ? {
                    border: "black solid 1px",
                    boxShadow: "0px 0px 4px 0px #888888",
                  }
                : null
            }
            type="text"
            autoComplete="false"
            id="myInput"
            name="myCountry"
            placeholder="🔍 Search for a country..."
            aria-label="Search through the content of the site"
          />
        </div>
      </form> */}
      <form action="/" id="formSelec">
        <select
          name="type"
          className={context.mode ? "light" : "dark"}
          style={
            context.mode
              ? {
                  border: "black solid 1px",
                  boxShadow: "0px 0px 4px 0px #888888",
                }
              : null
          }
          defaultValue={"DEFAULT"}
        >
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

export default Search;

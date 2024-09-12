import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ModeAction } from "../../store/context/mode";
import { useContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fRegion } from "../../store/context/fetchRegion";

function Search({ opt, call }) {
  const context = useContext(ModeAction);
  const regionctx = useContext(fRegion);
  const { countries } = useRouteLoaderData("main");
  const [coutry, sentCountry] = useState();
  const navigate = useNavigate();
  async function resolveCoutries(con) {
    let count = await con;
    count = count.map((cnt) => {
      const obj = {};
      obj.id = cnt.altSpellings[0];
      obj.name = cnt.name.common;
      return obj;
    });
    sentCountry(count);
  }

  useEffect(() => {
    resolveCoutries(countries);
  }, []);

  function formatResult(item) {
    return (
      <div className="result-wrapper">
        <span className="result-span">{item.name}</span>
      </div>
    );
  }
  function handleOnSelect(item) {
    navigate(`/${item.name}`);
    console.log(item.name);
  }

  function handleEvent(e) {
    console.log(e.target.value);
    regionctx.changeRegion(e.target.value);
  }

  return (
    <section id="srch" className="marg">
      <div className="src-container">
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
            hoverBackgroundColor: "#2d5eb8",
            color: context.mode ? "black" : "white",
            fontSize: "20px",
            iconColor: context.mode ? "black" : "white",
            lineColor: context.mode ? "black" : "white",
            placeholderColor: context.mode ? "black" : "white",
            clearIconMargin: "3px 8px 0 0",
            zIndex: "2",
          }}
        />
      </div>
      <form action="/" id="formSelec">
        <select
          onChange={handleEvent}
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
          {opt.map((reg) => (
            <option key={reg} value={reg} name={reg}>
              {call === "c"
                ? reg[0].toUpperCase() + reg.slice(1, reg.length)
                : null}
            </option>
          ))}
        </select>
      </form>
    </section>
  );
}

export default Search;

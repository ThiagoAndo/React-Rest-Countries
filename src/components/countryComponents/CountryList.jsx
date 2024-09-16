import CountryItem from "./CountryItem";
import Search from "./Search";
import { ModeAction } from "../../store/context/mode";
import { fRegion } from "../../store/context/fetchRegion";
import { useContext } from "react";
function CountryList({ countries }) {
  const context = useContext(ModeAction);
  const regionCtx = useContext(fRegion);
  let thisContries;
  if (regionCtx.data === undefined) thisContries = countries;
  else thisContries = regionCtx.data;

  let coutrySort = thisContries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );
  return (
    <>
      <Search
        opt={["africa", "americas", "asia", "europe", "oceania", "all regions"]}
        call={"c"}
        holderF={"Filter by Region"}
        holderS={"Search for a country"}
      />
      <section id="main" className={context.mode ? "blight" : "bDark"}>
        {coutrySort.map((cou) => (
          <CountryItem key={cou.name.common} country={cou} />
        ))}
      </section>
    </>
  );
}
export default CountryList;

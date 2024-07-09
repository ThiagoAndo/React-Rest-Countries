import CountryItem from "./CountryItem";
import Search from "../components/Search";
import { ModeAction } from "../store/context/mode";
import { useContext } from "react";
function CountryList({ countries }) {
  const context = useContext(ModeAction);

  let coutrySort = countries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );

  return (
    <>
      <Search />
      <section id="main" className={context.mode ? "blight" : "bDark"}>
        {coutrySort.map((cou) => (
          <CountryItem key={cou.name.common} country={cou} />
        ))}
      </section>
    </>
  );
}
export default CountryList;

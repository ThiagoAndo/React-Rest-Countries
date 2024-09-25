import CountryItem from "./CountryItem";
import Search from "./Search";
import { ModeAction } from "../../store/context/mode";
import { fRegion } from "../../store/context/fetchRegion";
import { useContext } from "react";
import { motion } from "framer-motion";
function CountryList({ countries }) {
  const context = useContext(ModeAction);
  const regionCtx = useContext(fRegion);
  let thisContries;
  let cn = null;
  if (regionCtx.data === undefined) thisContries = countries;
  else thisContries = regionCtx.data;

  let coutrySort = thisContries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );
  let val1;
  let val2;

  return (
    <>
      <Search
        opt={["africa", "americas", "asia", "europe", "oceania", "all regions"]}
        call={"c"}
        holderF={"Filter by Region"}
        holderS={"Search for a country"}
      />
      <motion.section id="main" className={context.mode ? "blight" : "bDark"}>
        {coutrySort.map((cou) => (
          <CountryItem key={cou.cca2} country={cou} />
        ))}
      </motion.section>
    </>
  );
}
export default CountryList;

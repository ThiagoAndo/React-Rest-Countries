import CountryItem from "./CountryItem";
import Search from "./Search";
import { ModeAction } from "../../store/context/mode";
import { fRegion } from "../../store/context/fetchRegion";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { locAction } from "../../store/redux/location";
import { useSelector, useDispatch } from "react-redux";

function CountryList({ countries }) {
  const backup = useSelector((state) => state.location.backup);
  const dispatch = useDispatch();
  const context = useContext(ModeAction);
  const regionCtx = useContext(fRegion);
  let thisContries;
  if (regionCtx.data === undefined) thisContries = countries;
  else thisContries = regionCtx.data;

  let coutrySort = thisContries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : -1
  );
  useEffect(() => {
    if (backup != null) {
      dispatch(locAction.setLocDistricts());
    }
  }, []);
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

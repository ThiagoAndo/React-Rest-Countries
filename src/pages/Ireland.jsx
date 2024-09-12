import { ModeAction } from "../store/context/mode";
import { fRegion } from "../store/context/fetchRegion";
import { useContext } from "react";
import { useSelector } from "react-redux";
export default function DistrictList() {
  const districts = useSelector((state) => state.location.districts);
console.log(districts);
console.log("districts");
  const context = useContext(ModeAction);
  const regionCtx = useContext(fRegion);
  let thisContries;
  if (regionCtx.data === undefined) thisContries = countries;
  else thisContries = regionCtx.data;

  return (
    // <>
      <Search />
    //   <section id="main" className={context.mode ? "blight" : "bDark"}>
    //     {coutrySort.map((cou) => (
    //       <CountryItem key={cou.name.common} country={cou} />
    //     ))}
    //   </section>
    // </>
  );
}

import { ModeAction } from "../store/context/mode";
import { fRegion } from "../store/context/fetchRegion";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Search from "../components/conutryComponents/Search";
export default function DistrictList() {
  const districts = useSelector((state) => state.location.districts);
  const sl = districts.slice(0, 8);
  const context = useContext(ModeAction);

  return (
    <>
      <Search
        opt={["africa", "americas", "asia", "europe", "oceania", "all regions"]}
        call={"c"}
      />

      <section id="main" className={context.mode ? "blight" : "bDark"}>
        {districts.map((dis) => (
          <div style={{ background: "red" }}>
            <h3>{dis.ED_ENGLISH}</h3>
            <h3>{dis.COUNTY}</h3>
          </div>
        ))}
      </section>
    </>
  );
}

import { ModeAction } from "../store/context/mode";
import DistrictItem from "../components/IrelandComponents/DistrictItem";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Search from "../components/countryComponents/Search";
export default function DistrictList() {
  const districts = useSelector((state) => state.location.districts);
  const sl = districts.slice(0, 3);
  const context = useContext(ModeAction);
  console.log("districts");
  console.log(districts);

  const arr = []

  return (
    <>
      <Search
        opt={["africa", "americas", "asia", "europe", "oceania", "all regions"]}
        call={"c"}
      />

      <section id="main_district" className={context.mode ? "blight" : "bDark"}>
        {
          sl.map((contae,i) => (
            <DistrictItem key={i} county={contae} />
          
          ))
        }
      </section>
    </>
  );
}

import { ModeAction } from "../store/context/mode";
import DistrictItem from "../components/IrelandComponents/DistrictItem";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { usePrepareLocation } from "../hooks/usePrepareLocation";
import Search from "../components/countryComponents/Search";
import { Triangle } from "react-loader-spinner";
import { ClockContext } from "../store/context/clock";

export default function DistrictList() {
  const conName = useSelector((state) => state.location.conName);
  const districts = useSelector((state) => state.location.districts);
  console.log(districts);
  console.log("districts");
  usePrepareLocation();


  return (
    <>
      <Search
        opt={conName}
        call={"d"}
        holderF={"Filter by County"}
        holderS={"Search for a district"}
      />
      {districts.length === 0 ? (
        <div id="loading">
          <Triangle
            visible={true}
            height="300"
            width="300"
            color="#4fa94d"
            ariaLabel="triangle-loading"
          />
        </div>
      ) : (
        <List />
      )}
    </>
  );
}

function List() {
  const districts = useSelector((state) => state.location.districts);
  const context = useContext(ModeAction);
  const txtClock = useContext(ClockContext);
  useEffect(() => {
    txtClock.stop();
  }, []);

  return (
    <section id="main_district" className={context.mode ? "blight" : "bDark"}>
      {districts.map((contae, i) => (
        <DistrictItem key={contae.attributes.ED_ENGLISH + i} county={contae} />
      ))}
    </section>
  );
}

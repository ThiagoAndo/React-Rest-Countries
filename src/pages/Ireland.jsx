import { ModeAction } from "../store/context/mode";
import DistrictItem from "../components/IrelandComponents/DistrictItem";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { usePrepareLocation } from "../hooks/usePrepareLocation";
import Search from "../components/countryComponents/Search";
import { Triangle } from "react-loader-spinner";

export default function DistrictList() {
  const conName = useSelector((state) => state.location.conName);
  const districts = useSelector((state) => state.location.districts);

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
            wrapperStyle={{}}
            wrapperClass=""
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
  const sl = districts.slice(0, 3);
  const context = useContext(ModeAction);
  return (
    <section id="main_district" className={context.mode ? "blight" : "bDark"}>
      {districts.map((contae, i) => (
        <DistrictItem
          key={contae.attributes.ED_ENGLISH}
          county={contae}
        />
      ))}
    </section>
  );
}

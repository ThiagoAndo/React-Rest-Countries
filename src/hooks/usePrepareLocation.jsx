import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../store/redux/location";
import { preparName } from "../helpers/preparLocName";
import {
  fetchCounty,
  fetchCountyInf,
  fetchLocationAnyWay,
} from "../helpers/HTTP";
let namePrepered = null;
let weatherResp = null;
export async function usePrepareLocation() {
  const districts = useSelector((state) => state?.location?.districts);
  const count = useSelector((state) => state?.location?.count);
  const loc = useSelector((state) => state?.location?.loc);
  const dispatch = useDispatch();
  let censusResp = null;
  let location = null;
  if (navigator?.geolocation && loc?.name === null) {
    navigator?.geolocation?.getCurrentPosition(
      (position) => showPosition(position, { alowed: true }),
      positionRefused
    );
  }
  if (count === 1 && districts?.length === 0) {
    setIrelandData(null, false);
  }

  async function showPosition(position, alowed) {
    location = position?.coords;
    const { latitude: lat, longitude: lon } = position?.coords;
    // Cordintation Test Portugal (Porto city):(
    // const lat = 41.11246878918088;
    // const lon = -8.585815429687502;
    //                                         )

    // Cordintation Test Ireland county(Naas):(
    // const lat = 53.21919081798935;
    // const lon = -6.661148071289063;
    //                                   )
    weatherResp = await fetchCounty(lat, lon);

    const n = weatherResp?.data[0]?.country;

    if (weatherResp != undefined) {
      if (n === "IE") {
        setIrelandData(weatherResp, true);
      } else {
        dispatch(
          locAction?.setLoc({
            country: weatherResp?.data[0]?.country,
            lat: weatherResp?.data[0]?.lat,
            lon: weatherResp?.data[0]?.lon,
            name: weatherResp?.data[0]?.name,
          })
        );
      }
    }
  }

  async function positionRefused() {
    const haveIt = await fetchLocationAnyWay();
    console.log(haveIt);
    console.log("haveIt");
    // const place = haveIt?.data?.country?.iso_code;
    const place = "PT";
    if (place === "IE") {
      const weatherResp = await fetchCounty(
        haveIt?.data?.location?.latitude,
        haveIt?.data?.location?.longitude
      );
      // Cordintation Test Ireland county(Naas):(
      // const weatherResp = await fetchCounty(
      //   53.21919081798935,
      //   -6.661148071289063
      // );
      //                                   )
      setIrelandData(weatherResp, true);
    } else {
      // const fakeResp = {
      //       country: haveIt?.data?.country?.iso_code,
      //       lat: haveIt?.data?.location?.latitude,
      //       lon: haveIt?.data?.location?.longitude,
      //       name: haveIt?.data?.country?.name,
      // };
      // dispatch(fakeResp, );
      // Cordintation Test Portugal(Porto city):(
      const fakeResp =
           {
             country: "PT",
             lat: 41.11246878918088,
             lon:  -8.585815429687502,
             name: "Portugal",
             city:"Vila Nova de Gaia"
       }
      // 
      //                                         )
      dispatch(locAction.setLoc(fakeResp))
    }
  }

  async function setIrelandData(weatherResp, hasIt) {
    const data = { ...weatherResp?.data[0] };
    data.name = preparName(hasIt ? data.name : "Ireland");
    censusResp = await fetchCountyInf();
    if (censusResp?.status === 200) {
      dispatch(locAction?.setData(censusResp?.data?.features));
      dispatch(locAction?.setSearchValues());

      dispatch(locAction?.findDistrict(data));
    }
  }
}

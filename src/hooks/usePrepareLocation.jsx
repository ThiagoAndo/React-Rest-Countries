import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../store/redux/location";
import { preparName } from "../helpers/preparLocName";
import {
  fetchCounty,
  fetchCountyInf,
  fetchByCode,
  fetchLocationAnyWay,
} from "../helpers/HTTP";
export async function usePrepareLocation() {
  const districts = useSelector((state) => state?.location?.districts);
  const count = useSelector((state) => state?.location?.count);
  const loc = useSelector((state) => state?.location?.loc);
  const dispatch = useDispatch();
  let weatherResp = null;
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
    // const { latitude: lat, longitude: lon } = position?.coords;
    // Cordintation Test Portugal (Porto city):(
    const lat = 41.11246878918088;
    const lon = -8.585815429687502;
    //                                         )

    // Cordintation Test Ireland county:(
    // const lat = 53.3284125525758;
    // const lon = -6.523132324218751;
    //                                   )
    weatherResp = await fetchCounty(lat, lon);

    if (weatherResp != undefined) {
      fetchLocInf(weatherResp, alowed);
    } 
  }

  async function positionRefused() {
    const haveIt = await fetchLocationAnyWay();
    console?.log(haveIt);
    console?.log("haveIt");
    const place = haveIt?.data?.country?.iso_code;
    // const place = "PT";

    if (place === "IE") {
      const weatherResp = await fetchCounty(
        haveIt?.data?.location?.latitude,
        haveIt?.data?.location?.longitude
      );
      serchCountry(weatherResp, { loc: false });
    } else {
      
      const fakeResp = {
        data: [
          {
            country: haveIt?.data?.country?.iso_code,
            lat: haveIt?.data?.location?.latitude,
            lon: haveIt?.data?.location?.longitude,
            name: haveIt?.data?.country?.name,
          },
        ],
        status: 404,
      };
      serchCountry(fakeResp, { loc: true });
      // Cordintation Test Portugal(Porto city):(
      //  serchCountry({
      //    data: [
      //      {
      //        country: "PT",
      //        lat: 41.11246878918088,
      //        lon:  -8.585815429687502,
      //        name: "Portugal"
      //      },
      //    ],
      //    status: 404,
      //  }
      // , { loc: truue });
      //                                         )
    }
  }

  async function fetchLocInf(weatherResp, alowed) {
    if (alowed?.alowed) {
      const n = weatherResp?.data[0]?.country;
      if (n === "IE") {
        setIrelandData(weatherResp, { loc: true });
      } else {
        serchCountry(weatherResp, { loc: true });
      }
    }
  }

  async function serchCountry(weatherResp, loc) {
    if (loc?.loc) {
      const n = weatherResp?.data[0]?.country;
      const resp = await fetchByCode(n);
      if (resp != undefined) {
        dispatch(
          locAction?.setLoc({
            country: resp[0]?.cca2,
            lat: weatherResp?.data[0]?.lat,
            lon: weatherResp?.data[0]?.lon,
            name: resp[0]?.name?.common,
          })
        );
      }
    } else {
      const n = weatherResp?.data[0]?.country;
      dispatch(locAction?.setLoc(weatherResp?.data[0]));
      if (n === "IE") {
        setIrelandData(weatherResp, true);
      }
    }
  }

  async function setIrelandData(weatherResp, hasIt) {
    censusResp = await fetchCountyInf();
    if (censusResp?.status === 200) {
      dispatch(locAction?.setData(censusResp?.data?.features));
      dispatch(locAction?.setSearchValues());
      const namePrepered = preparName(
        hasIt ? weatherResp?.data[0]?.name : "Ireland"
      );
      dispatch(locAction?.findDistrict({ name: namePrepered }));
    }
    return censusResp;
  }
}

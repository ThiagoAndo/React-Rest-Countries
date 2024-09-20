import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../store/redux/location";
import { preparName } from "../helpers/preparLocName";
import { fetchCounty, fetchCountyInf, fetchByCode } from "../helpers/HTTP";
export async function usePrepareLocation() {
  const districts = useSelector((state) => state.location.districts);
  const count = useSelector((state) => state.location.count);
  const loc = useSelector((state) => state.location.loc);
  const dispatch = useDispatch();
  let weatherResp = null;
  let censusResp = null;
  let location = null;
  if (navigator.geolocation && loc.lon === null) {
    navigator.geolocation.getCurrentPosition(showPosition, positionRefused);
  }

  if (count === 1 && districts.length === 0) {
    positionRefused();
  }

  async function showPosition(position) {
    location = position.coords;
    const { latitude: lat, longitude: lon } = position.coords;
    // Cordintation Test:(
    // const lat = 38.685509760012025;
    // const lon = -9.343872070312502;
    //                    )
    weatherResp = await fetchCounty(lat, lon);
    if (weatherResp != undefined) {
      fetchLocInf(weatherResp);
    } else {
      positionRefused(weatherResp);
    }
  }

  function positionRefused() {
    const fakeWeatherResponse = {
      data: [
        {
          country: "IE",
          lat: 53.3332136,
          lon: -6.546788917958724,
          name: "Ireland",
        },
      ],
      status: 404,
    };
    setAllDistricts(fakeWeatherResponse);
  }

  async function fetchLocInf(weatherResp) {
    const n = weatherResp.data[0].country;
    if (n === "IE") {
      censusResp = await fetchCountyInf();
      if (censusResp?.status === 200) {
        dispatch(locAction.setData(censusResp.data.features));
        const namePrepered = preparName(weatherResp.data[0].name);
        dispatch(locAction.findDistrict({ name: namePrepered, hasLoc: true }));
        dispatch(locAction.setSearchValues());
      }
    } else {
      const resp = await fetchByCode(n);
      if (resp != undefined) {
        console.log(resp[0]);
      dispatch(
        locAction.setLoc({
          country: "IE",
          lat: 53.3332136,
          lon: -6.546788917958724,
          name: resp[0].name.common,
        })
      );

      }
    }
  }

  async function setAllDistricts(weatherResp) {
    censusResp = await fetchCountyInf();
    if (censusResp.status === 200) {
      dispatch(locAction.setData(censusResp.data.features));
      dispatch(locAction.setLoc(weatherResp.data[0]));
      dispatch(locAction.findDistrict({ hasLoc: false }));
      dispatch(locAction.setSearchValues());
    }
  }
}

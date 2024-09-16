import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../store/redux/location";
import { preparName } from "../helpers/preparLocName";
import { fetchCounty, fetchCountyInf } from "../helpers/HTTP";
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
    // const lat = 53.55254694138004;
    // const lon = -6.790924072265626;
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
    censusResp = await fetchCountyInf();
    if (censusResp.status === 200) {
      dispatch(locAction.setData(censusResp.data.features));
      const namePrepered = preparName(weatherResp.data[0].name);
      weatherResp.data[0].name = namePrepered;
      dispatch(locAction.setLoc(weatherResp.data[0]));
      dispatch(locAction.findDistrict({ name: namePrepered, hasLoc: true }));
      dispatch(locAction.setSearchValues())
    }
  }

  function setAllDistricts(weatherResp) {
    dispatch(locAction.setLoc(weatherResp.data[0]));
    dispatch(locAction.findDistrict({ hasLoc: false }));
    dispatch(locAction.setSearchValues())
  }
}

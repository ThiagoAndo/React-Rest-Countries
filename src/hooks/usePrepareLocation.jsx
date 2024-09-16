import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../store/redux/location";
import { preparName, getInfo } from "../helpers/userLocation";
import { fetchCounty, fetchCountyInf } from "../helpers/HTTP";
const WEATHER_KEY = import.meta.env.VITE_WEATHER_SECRETE_KEY;
export async function usePrepareLocation() {
  const loc = useSelector((state) => state.location.loc);
  const dispatch = useDispatch();
  let weatherResp = null;
  let censusResp = null;
  let location = null;
  if (navigator.geolocation && loc.lon === null) {
    navigator.geolocation.getCurrentPosition(showPosition, positionRefused);
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
    fetchLocInf(fakeWeatherResponse);
  }

  async function fetchLocInf(weatherResp) {
    censusResp = await fetchCountyInf();
    if (censusResp.status === 200) {
      const namePrepered = preparName(weatherResp.data[0].name);
      let inf = getInfo(censusResp.data, namePrepered);
      weatherResp.data[0].name = namePrepered;
      if (inf.length > 0 && weatherResp.status === 200) {
        dispatch(locAction.setDistricts(inf));
        dispatch(locAction.setLoc(weatherResp.data[0]));
      } else {
        weatherResp.data[0].name = "Ireland";
        dispatch(locAction.setLoc(weatherResp.data[0]));
        dispatch(locAction.setDistricts(censusResp.data.features));
      }
    }
  }
}

import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../store/redux/location";
import { preparName, getInfo } from "./userLocation";
const WEATHER_KEY = import.meta.env.VITE_WEATHER_SECRETE_KEY;
const TIME_KEY = import.meta.env.VITE_TIME_ZONE_KEY;

export async function loadCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  if (response.status === 200) {
    return response.data;
  }
}

export async function useGetLocationName() {
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
    // const lat = 53.55254694138004;
    // const lon = -6.790924072265626;
    weatherResp = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${WEATHER_KEY}`
    );
    if (weatherResp.status === 200) {
     fetchLocInf(weatherResp)
    }
  }

  function positionRefused(error) {
    const fakeWeatherResponse ={
    data :[{country: "IE",lat:53.3332136,lon:-6.546788917958724,name:"Ireland"}],
    status: 404,
    }
    fetchLocInf(fakeWeatherResponse);
  }



async function fetchLocInf(weatherResp) {
  censusResp = await axios.get(
    "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Census2016_Theme1Table2_ED/FeatureServer/0/query?where=1%3D1&outFields=ED_ENGLISH,COUNTY,CONTAE,PROVINCE,T1_1AGETT,T1_1AGETF,T1_1AGETM,T1_2SGLF,T1_2SGLM,T1_2SGLT&outSR=4326&f=json"
  );
  if (censusResp.status === 200 ) {
    const namePrepered = preparName(weatherResp.data[0].name);
    let inf = getInfo(censusResp.data, namePrepered);
    weatherResp.data[0].name = namePrepered;
    if (inf.length > 0 && weatherResp.status === 200) {
      dispatch(locAction.setDistricts(inf));
      dispatch(locAction.setLoc(weatherResp.data[0]));
    } else {
      weatherResp.data[0].name = "Ireland";
      console.log(weatherResp);
      dispatch(locAction.setLoc(weatherResp.data[0]));
      dispatch(locAction.setDistricts(censusResp.data.features));
    }
  }
}


}

export async function fetchRegion(region) {
  let url;
  if (region != "all regions")
    url = `https://restcountries.com/v3.1/region/${region}`;
  else url = "https://restcountries.com/v3.1/all";

  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data;
  }
}

export async function fetchZone(coutry) {
  let response;
  try {
    response = await fetch();
    // `https://api.timezonedb.com/v2.1/list-time-zone?key=${TIME_KEY}&format=json&country=${coutry?.cca2}`
  } catch (error) {
    console.log("loadZone error: " + error);
  }
  if (response?.ok) {
    const resData = await response.json();
    return resData;
  } else {
    return undefined;
  }
}

export async function loadTimeZone(zone) {
  let response;
  try {
    response = await fetch();
    // `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_KEY}&format=json&by=zone&zone=${zone}`
  } catch (error) {
    console.log("loadTime error: " + error);
  }

  if (response?.ok) {
    const resData = await response.json();
    return resData;
  } else {
    return undefined;
  }
}

// else {
//   dispatch(
//     locAction.setLoc({
//       count: null,
//       country: null,
//       lat: null,
//       local_names: null,
//       lon: null,
//       name: "Ireland",
//     })
//   );
// }

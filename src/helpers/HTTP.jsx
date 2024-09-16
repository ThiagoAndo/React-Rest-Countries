import axios from "axios";
const WEATHER_KEY = import.meta.env.VITE_WEATHER_SECRETE_KEY;
const TIME_KEY = import.meta.env.VITE_TIME_ZONE_KEY;
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export async function fetchCountries() {
  let response = null;
  try {
    response = await axios.get("https://restcountries.com/v3.1/all");
  } catch (error) {
    console.log("fetchCountries error: " + error);
  }
  if (response.status === 200) {
    return response.data;
  }
}
export async function fetchRegion(region) {
  let url;
  let response;
  if (region != "all regions")
    url = `https://restcountries.com/v3.1/region/${region}`;
  else url = "https://restcountries.com/v3.1/all";

  try {
    response = await axios.get(url);
  } catch (error) {
    console.log("fetchRegion error: " + error);
  }
  if (response.status === 200) {
    return response.data;
  }
}
export async function fetchZone(coutry) {
  let response;
  try {
    response = await fetch(
      `https://api.timezonedb.com/v2.1/list-time-zone?key=${TIME_KEY}&format=json&country=${coutry?.cca2}`
    );
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
    response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_KEY}&format=json&by=zone&zone=${zone}`
    );
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
export async function fetchCounty(lat, lon) {
  let response;
  try {
    response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${WEATHER_KEY}`
    );
  } catch (error) {
    console.log(error);
  }
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
}
export async function fetchCountyInf() {
  let response;
  try {
    response = await axios.get(
      "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Census2016_Theme1Table2_ED/FeatureServer/0/query?where=1%3D1&outFields=ED_ENGLISH,COUNTY,CONTAE,PROVINCE,T1_1AGETT,T1_1AGETF,T1_1AGETM,T1_2SGLF,T1_2SGLM,T1_2SGLT&outSR=4326&f=json"
    );
  } catch (error) {
    console.log(error);
  }
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
}
export async function fetchWeatherData(lat, lon) {
  const url = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;

  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(url),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}
export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
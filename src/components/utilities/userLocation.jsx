const key = import.meta.env.VITE_WEATHER_SECRETE_KEY;
import axios from "axios";

export function getLocation() {
  const retrive = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function showPosition(
      position
    ) {
      const { latitude: lat, longitude: lon } = position.coords;
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${key}`
      );
      if (res.status === 200) {
        console.log(res.data[0].name);
         retrive =res.data[0].name;
      }
    });
  }
  
}

// const [locationName, setLocationName] = useState(null);
//   //  setLocationName(preparName(getLocation()));
//   // setLocationData(preparName(getLocation()));
//   // console.log(preparName(getLocation()));
export async function getLocationInfo(place) {
  // resource https://dev.to/abidullah786/how-to-access-user-location-in-react-3odj
  const res = await axios.get(
    "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Census2016_Theme1Table2_ED/FeatureServer/0/query?where=1%3D1&outFields=ED_ENGLISH,T1_1AGETM,T1_1AGETF,T1_1AGETT,T1_2SGLM,T1_2SGLF,T1_2TF,COUNTY,CONTAE,PROVINCE,T1_2TM,T1_2SGLT&returnGeometry=false&outSR=4326&f=json"
  );
  if (res.status === 200) {
    return getInfo(res.data, place);
  }
}

export function getInfo(data, place) {
  const uper = place.toUpperCase().trim();

  let found = null;
  const { features } = data;
  found = features
    .map((obj) => {
      const { attributes } = obj;
      return attributes;
    })
    .filter((county) => {
      return county.ED_ENGLISH === uper;
    });

  if (found.length <= 0) {
    found = features
      .map((obj) => {
        const { attributes } = obj;
        return attributes;
      })
      .filter((county) => {
        return county.COUNTY === place.trim();
      });
  }

  console.log(found);
  console.log("found");
  return found;
}

export function preparName(place) {
  if (place.indexOf(" ")) {
    const idnx = place.lastIndexOf(" ");
    return place.slice(idnx, place.length);
  }
}

export function totalPopulation(data, place) {
  {
    const { features } = data;
    const total = features
      .map((obj) => {
        const { properties } = obj;
        return properties;
      })
      .filter((county) => {
        return county.COUNTY === place;
      })
      .map((conty) => {
        const { T1_2T } = conty;
        return T1_2T;
      })
      .reduce((total, num) => {
        return total + num;
      }, 0);
    return total;
  }
}

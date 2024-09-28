import { fetchCities } from "./HTTP";
export async function fetchPlace(city, country) {
  try {
    let citiesList = await fetchCities(city);

    const foundPlace = {
      data: citiesList.data.filter((list) => {
        return list.city === city && list.countryCode === country;
      }),
    };

    const ret = foundPlace;
    return ret;
  } catch (error) {
    return { error };
  }
}

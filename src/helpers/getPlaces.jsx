import { fetchCities } from "./HTTP";
export async function fetchPlace(city, country) {
  try {
    let citiesList = await fetchCities(city);
    let foundPlace = {
      data: citiesList.data.filter((list) => {
        return list.city === city && list.countryCode === country;
      }),
    };

    if (foundPlace?.data?.length === 0) {
      foundPlace = {
        data: citiesList.data.filter((list) => {
          return list.city.includes(city) && list.countryCode === country;
        }),
      };

      if (foundPlace?.data?.length > 0) foundPlace.data[0].name = city;
    }

    const ret = foundPlace;
    return ret;
  } catch (error) {
    return { error };
  }
}

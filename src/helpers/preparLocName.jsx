export function preparName(place) {
  let arr;
  const check =
    place.includes("The") ||
    place.includes("Municipal") ||
    place.includes("District") ||
    place.includes("City") ||
    place.includes("North") ||
    place.includes("East") ||
    place.includes("South") ||
    place.includes("West");

  if (check) {
    arr = place.split(" ").filter((lett) => {
      return (
        lett != "The" &&
        lett != "Municipal" &&
        lett != "District" &&
        lett != "of" &&
        lett != "City" &&
        lett != "North" &&
        lett != "East" &&
        lett != "South" &&
        lett != "West"
      );
    });
    const [name] = arr;
    return name;
  }

  return place;
}

export function prepareCountyName(ED_ENGLISH) {
  let county
  if (ED_ENGLISH.includes(" ")) {
    county = ED_ENGLISH.split(" ")[0];
  } else if (ED_ENGLISH.includes("-")) {
    county = ED_ENGLISH.split("-")[0];
  } else {
    county = ED_ENGLISH;
  }
  county = county[0] + county.slice(1, county.length).toLowerCase();
  return county;
}
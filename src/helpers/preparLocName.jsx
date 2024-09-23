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

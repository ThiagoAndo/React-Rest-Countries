
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

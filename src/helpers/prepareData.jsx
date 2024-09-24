export function prepareData(country) {
  let {
    country: [count],
  } = country;
  let crrKey;
  let crr = "No";
  let lag = "No";
  let langKey;
  let subReg = "No";
  let capital = "No";
  if (count?.currencies) {
    crrKey = Object.keys(count.currencies)[0];
    crr = count.currencies[crrKey].name;
  }

  if (count?.languages) {
    langKey = Object.keys(count?.languages)[0];
    lag = count?.languages[langKey];
  }

  if (count?.subregion) {
    subReg = count.subregion;
  }

  if (count?.capital) {
    capital = count.capital[0];
  }
    console.log(count.cca2);
    console.log('count.cca2');


  return [lag, crr, capital, subReg, count.cca2];
}

export function findBorders(count, thisCountries) {
  let bordersArray = [];

  let findCountryName = (cca3, data) => {
    let count = -1;
    do {
      count++;
    } while (data[count].cca3 !== cca3);
    return data[count].name.common;
  };
  for (let index = 0; index < count.borders.length; index++) {
    let name = findCountryName(count.borders[index], thisCountries);
    let longName = "";

    if (name.length > 10) {
      for (let index = 0; index <= 10; index++) {
        if (index <= 7) {
          longName += name[index];
        } else if (index === 8) {
          longName += " ...";
        }
      }
      bordersArray.push({ id: count.borders[index], name: longName });
    } else {
      bordersArray.push({ id: count.borders[index], name });
    }
  }
  return bordersArray;
}

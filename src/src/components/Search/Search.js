import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../../api/OpenWeatherService";

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    console.log(inputValue);
    console.log("inputValue");
    const citiesList = await fetchCities(inputValue);
    console.log(citiesList);
    console.log("citiesList");
    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;

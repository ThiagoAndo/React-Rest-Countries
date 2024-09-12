import { createContext, useState } from "react";

export const fRegion = createContext({
  data: null,
  changeRegion: () => {},
});

export default function RegionProvider({ children }) {
  const [data, setData] = useState();

  async function changeRegion(region) {
    let url;
    if(region !="all regions" ) url = `https://restcountries.com/v3.1/region/${region}`;
    else url = "https://restcountries.com/v3.1/all";

    const response = await fetch(url);
    if (!response.ok) {
      throw json(
        { message: "Could not fetch countries." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      
      setData(resData);
    }
  }

  const ctxValue = {
    data,
    changeRegion,
  };

  return <fRegion.Provider value={ctxValue}>{children}</fRegion.Provider>;
}

import { createContext, useState } from "react";
import { fetchRegion } from "../../helpers/HTTP";

export const fRegion = createContext({
  data: null,
  changeRegion: () => {},
});

export default function RegionProvider({ children }) {
  const [data, setData] = useState(undefined);

  async function changeRegion(region) {
      console.log(region);
      console.log("egionCtx.data");
    const resData = await fetchRegion(region);
    setData(resData);
  }
  const ctxValue = {
    data,
    changeRegion,
  };

  return <fRegion.Provider value={ctxValue}>{children}</fRegion.Provider>;
}

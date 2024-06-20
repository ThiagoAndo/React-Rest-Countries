import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
function Detailed(country) {
  const { countries } = useRouteLoaderData("main");
  const [thisCountries, setCoutries] = useState(null);

  useEffect(() => {
    async function parse() {
      const data = await countries;
    
      setCoutries(data)
    }
    parse()
  }, []);
  console.log(thisCountries);
  console.log("useRouteLoaderData");

  if(thisCountries===null){
    return <h1>Loading...</h1>;
  }else{
    return <h1>Loaded</h1>;

  }
}

export default Detailed;

import { useContext, useState, useEffect} from "react";
import { ModeAction } from "../store/context/mode";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import {motion} from "framer-motion"

function MainNavigation() {
  const context = useContext(ModeAction);
  const navigate = useNavigate();

 const [locationData, setLocationData] = useState(null);
 useEffect(() => {
   getLocation();
 }, []);
  async function getLocation() {
   // resource https://dev.to/abidullah786/how-to-access-user-location-in-react-3odj
    const res = await axios.get("http://ip-api.com/json");
    console.log(res);
    if (res.status === 200) setLocationData(res.data);
  }

  function myLocation(){
    navigate(`/${locationData.country}`);
  }
  console.log(locationData);
return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={myLocation}>
          <motion.h2
          
          >What about my location?</motion.h2>
        </div>
        <div id="btn" onClick={context.changeMode}>
          <div className={context.mode ? "" : "filt"}></div>
          <div>
            <p>Light Mode</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;

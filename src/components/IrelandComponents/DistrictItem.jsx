import { ModeAction } from "../../store/context/mode";
import { useContext, useRef } from "react";
import { motion } from "framer-motion";

function DistrictItem({ county }) {
  const context = useContext(ModeAction);
  const initState = {
    description: "nav-link  active-dark",
    population: "nav-link",
    weather: "nav-link",
  };

  let obj = {
    CONTAE: "Baile Átha Cliath",
    COUNTY: "Dublin",
    ED_ENGLISH: "AIRPORT", //District
    PROVINCE: "Leinster",
    T1_1AGETT: 5018, //Total - Population

    T1_1AGETF: 2476, //Total - Male Population
    T1_1AGETM: 2542, //Total - Female Population
    T1_2SGLF: 1480, //Single - Females
    T1_2SGLM: 1477, //Single - Males
    T1_2SGLT: 2957, //Single - Total
  };

  return (
    <div className="card">
      <div
        className={
          context.mode ? "card-header active" : "card-header active-dark"
        }
      >
        <ul
          className="nav nav-tabs card-header-tabs"
          id="bologna-list"
          role="tablist"
        >
          {["Description", "Population", "Weather"].map((tab) => (
            <CartNav id={tab} />
          ))}
        </ul>
      </div>
      <div
        className={
          context.mode ? "card-body  active" : "card-body  active-dark"
        }
      >
        <h4 className="card-title">Fingal</h4>
        <Panel />

        <div className="tab-content mt-3">
          <div
            className="tab-pane"
            id="deals"
            role="tabpanel"
            aria-labelledby="deals-tab"
          >
            {/* <p className="card-text">
              Immerse yourself in the colours, aromas and traditions of
              Emilia-Romagna with a holiday in Bologna, and discover the city's
              rich artistic heritage.
            </p>
            <a href="#" className="btn btn-danger btn-sm">
              Get Deals
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartNav({mode, handleAction, id}) {
  return (
    <li className="nav-item">
      <a
        className="nav-link"
        id={id}
        href="#deals"
        role="tab"
        aria-controls="deals"
        aria-selected="false"
      >
        {id}
      </a>
    </li>
  );
}

function Panel() {
  const context = useContext(ModeAction);

  return (
    <div className="tab-pane active " id="description" role="tabpanel">
      <div>
        <div className="infoBox">
          <p>
            <strong>Population: </strong>
            municipium
          </p>
          <p>
            <strong>Population: </strong>
            municipium
          </p>
          <p>
            <strong>Region: </strong>
            Etruscan
          </p>
          <p>
            <strong>Capital: </strong>
            founded
          </p>
        </div>
      </div>
    </div>
  );
}

export default DistrictItem;

//  <Link to={`/${country.name.common}`}>
//     <motion.article
//       transition={{ type: "spring" }}
//       key={country.name.common}
//       whileHover={{
//         scale: [0.95, 1.3, 1],
//         boxShadow: "0px 0px 6px 0px #888888",
//       }}
//       classNameName={context.mode ? "light" : "dark"}
//       style={
//         context.mode
//           ? {
//               border: "black solid 1px",
//               boxShadow: "0px 0px 4px 0px #888888",
//             }
//           : null
//       }
//       id={country.name.common}
//     >
//       <div style={{ backgroundImage: `url(${country.flags.png})` }}> </div>
//       <div>
//         <div classNameName="infoBox">
//           <h3>{country.name.common}</h3>
//           <p>
//             <strong>Population: </strong>
//             {country.population}
//           </p>
//           <p>
//             <strong>Region: </strong>
//             {country.region}
//           </p>
//           <p>
//             <strong>Capital: </strong>
//             {country.capital}
//           </p>
//         </div>
//       </div>
//     </motion.article>
//   </Link>

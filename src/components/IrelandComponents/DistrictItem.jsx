import { Link } from "react-router-dom";
import { ModeAction } from "../../store/context/mode";
import { useContext } from "react";
import { motion } from "framer-motion";
function DistrictItem({ country }) {
  const context = useContext(ModeAction);

  return (
    <div class="card">
      <div class="card-header">
        <ul
          class="nav nav-tabs card-header-tabs dark"
          id="bologna-list"
          role="tablist"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              href="#description"
              role="tab"
              aria-controls="description"
              aria-selected="true"
            >
              Description
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#history"
              role="tab"
              aria-controls="history"
              aria-selected="false"
            >
              History
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#deals"
              role="tab"
              aria-controls="deals"
              aria-selected="false"
            >
              Deals
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Bologna</h4>
        <h6 class="card-subtitle mb-2">Emilia-Romagna Region, Italy</h6>

        <div class="tab-content mt-3">
          <div class="tab-pane active" id="description" role="tabpanel">
            <p class="card-text">
              It is the seventh most populous city in Italy, at the heart of a
              metropolitan area of about one million people.
            </p>
            <a href="#" class="card-link text-danger">
              Read more
            </a>
          </div>

          <div
            class="tab-pane"
            id="history"
            role="tabpanel"
            aria-labelledby="history-tab"
          >
            <p class="card-text">
              First settled around 1000 BCE and then founded as the Etruscan
              Felsina about 500 BCE, it was occupied by the Boii in the 4th
              century BCE and became a Roman colony and municipium with the name
              of Bononia in 196 BCE.{" "}
            </p>
            <a href="#" class="card-link text-danger">
              Read more
            </a>
          </div>

          <div
            class="tab-pane"
            id="deals"
            role="tabpanel"
            aria-labelledby="deals-tab"
          >
            <p class="card-text">
              Immerse yourself in the colours, aromas and traditions of
              Emilia-Romagna with a holiday in Bologna, and discover the city's
              rich artistic heritage.
            </p>
            <a href="#" class="btn btn-danger btn-sm">
              Get Deals
            </a>
          </div>
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
  //       className={context.mode ? "light" : "dark"}
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
  //         <div className="infoBox">
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
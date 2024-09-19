import { ModeAction } from "../../store/context/mode";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import CardNav from "./districtItemHeader";
import Panel from "./distridtItemBody";


export default function DistrictItem({ county }) {
  const [tabActive, setTabActive] = useState("Description");
  const context = useContext(ModeAction);

  function handleTabClick(id) {
    setTabActive(id);
  }

  return (
    <motion.div className="card">
      <div className={context.mode ? "card-header" : "card-header dark"}>
        <ul
          className="nav nav-tabs card-header-tabs"
          id="bologna-list"
          role="tablist"
        >
          {["Description", "Population", "Weather"].map((tab) => (
            <CardNav
              key={tab}
              id={tab}
              active={tabActive}
              mode={context.mode}
              handleAction={handleTabClick}
            />
          ))}
        </ul>
      </div>
      <div
        className={
          context.mode ? "card-body  active" : "card-body  active-dark"
        }
      >
        <Panel data={county} id={tabActive.slice(0, 3)} />
      </div>
    </motion.div>
  );
}

<div className="tab-content mt-3">
  <div
    className="tab-pane"
    id="deals"
    role="tabpanel"
    aria-labelledby="deals-tab"
  ></div>
</div>;

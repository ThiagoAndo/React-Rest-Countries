import ForecastApp from "../countryComponents/ForecastApp";
export default function Panel({ data, id }) {
  const { attributes } = data;

  return (
    <div className="tab-pane active " id={id} role="tabpanel">
      <div>
        <PanelText attributes={attributes} id={id} />
      </div>
    </div>
  );
}

function PanelText({ attributes, id }) {
  const { CONTAE, COUNTY, ED_ENGLISH, PROVINCE, T1_1AGETT } = attributes;
  const { T1_1AGETF, T1_1AGETM, T1_2SGLF, T1_2SGLM } = attributes;
  let weather = null;
  if (ED_ENGLISH.includes(" ")) {
    weather = ED_ENGLISH.split(" ")[0];
  } else if (ED_ENGLISH.includes("-")) {
    weather = ED_ENGLISH.split("-")[0];
  } else {
    weather = ED_ENGLISH;
  }

  if (id != "Wea") {
    return (
      <>
        <h4 className="card-title">{ED_ENGLISH}</h4>
        <div className="infoBox">
          <p>
            <strong>{id === "Des" ? "Contae: " : "Single Male: "}</strong>
            {id === "Des" ? CONTAE : T1_2SGLM.toLocaleString("en-US")}
          </p>
          <p>
            <strong>{id === "Des" ? "County: " : "Total Male: "}</strong>
            {id === "Des" ? COUNTY : T1_1AGETF.toLocaleString("en-US")}
          </p>
          <p>
            <strong>{id === "Des" ? "Province: " : "Single Females: "}</strong>
            {id === "Des" ? PROVINCE : T1_2SGLF.toLocaleString("en-US")}
          </p>
          <p>
            <strong>{id === "Des" ? "Population: " : "Total Female: "}</strong>
            {id === "Des" ? T1_1AGETT : T1_1AGETM.toLocaleString("en-US")}
          </p>
        </div>
      </>
    );
  } else {
    return (
      <div className="weather_cont_county">
        <ForecastApp cap={{ try: weather, try_2: COUNTY }} county={true} />
      </div>
    );
  }
}

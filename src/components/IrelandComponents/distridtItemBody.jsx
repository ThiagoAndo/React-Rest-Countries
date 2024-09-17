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
  console.log(id);

  return (
    <>
      <h4 className="card-title">{ED_ENGLISH}</h4>
      <div className="infoBox">
        <p>
          <strong>{id === "Des" ? "Contae: " : "Total Male: "}</strong>
          {id === "Des" ? CONTAE : T1_1AGETF.toLocaleString("en-US")}
        </p>
        <p>
          <strong>{id === "Des" ? "County: " : "Total Female: "}</strong>
          {id === "Des" ? COUNTY : T1_1AGETM.toLocaleString("en-US")}
        </p>
        <p>
          <strong>{id === "Des" ? "Province: " : "Single Females: "}</strong>
          {id === "Des" ? PROVINCE : T1_2SGLF.toLocaleString("en-US")}
        </p>
        <p>
          <strong>{id === "Des" ? "Population: " : "Single Male: "}</strong>
          {id === "Des"
            ? T1_1AGETT.toLocaleString("en-US")
            : T1_2SGLM.toLocaleString("en-US")}
        </p>
      </div>
    </>
  );
}

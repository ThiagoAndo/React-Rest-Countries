
export default function Panel({data}) {
  const {attributes} =data

  return (
    <div className="tab-pane active " id="description" role="tabpanel">
      <div>
        <PanelText attributes={attributes} />
      </div>
    </div>
  );
}


function PanelText({ attributes }) {
  return (
    <>
      <h4 className="card-title">{attributes.ED_ENGLISH}</h4>
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
    </>
  );
}
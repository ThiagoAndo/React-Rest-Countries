import { Link } from "react-router-dom";

function Borders({ id, name }) {
  return (
    <Link to={`/${id}`}>
      <span className="selectBorder dark" id={id}>
        {name}
      </span>
    </Link>
  );
}

export default Borders;

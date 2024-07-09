import { Link } from "react-router-dom";
import { ModeAction } from "../store/context/mode";
import { useContext } from "react";
function Borders({ id, name }) {
  const context = useContext(ModeAction);

  return (
    <Link to={`/${id}`}>
      <span
        className={context.mode ? "selectBorder light" : "selectBorder dark"}
        id={id}
      >
        {name}
      </span>
    </Link>
  );
}

export default Borders;

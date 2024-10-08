import { Link } from "react-router-dom";
import { ModeAction } from "../../store/context/mode";
import { useContext } from "react";
function Borders({ id, name }) {
  const context = useContext(ModeAction);
  return (
    <Link to={`/${id}`}>
      <p
        className={context.mode ? "selectBorder light" : "selectBorder dark"}
        id={id}
      >
        {name}
      </p>
    </Link>
  );
}

export default Borders;

import { useContext } from "react";
import { ModeAction } from "../../store/context/mode";
export default function CartNav({ mode, handleAction, id, active }) {
  const context = useContext(ModeAction);
  let thisClass = null;

  if (active === id) {
    thisClass = mode ? "nav-link active" : "nav-link active-dark";
  }
  function handleClick(e) {
    e.preventDefault();

    // if (e.target.id === "Weather") context.blockMode();
    handleAction(e.target.id);
  }

  return (
    <li className="nav-item">
      <a
        onClick={handleClick}
        className={`nav-link ${thisClass}`}
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

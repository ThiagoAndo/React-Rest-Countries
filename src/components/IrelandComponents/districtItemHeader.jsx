export default function CartNav({ mode, handleAction, id, active }) {
  let thisClass = null;
  if (active === id) {
    thisClass = mode ? "nav-link active" : "nav-link active-dark";
  }
  function handleClick(e) {
    e.preventDefault();
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

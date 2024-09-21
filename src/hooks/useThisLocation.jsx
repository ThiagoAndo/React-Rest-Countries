import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useThisLocation() {
  const country = useSelector((state) => state.location.loc);
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  function setNavigation() {
    if (country?.country === "IE") {
      if (path === "/ireland") {
        navigate("/");
      }
      if (path === "/") {
        navigate("/ireland");
      }
    } else {
      navigate(country?.country, { state: country });
    }
  }

  return {
    path,
    navi: setNavigation,
  };
}

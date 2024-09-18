import { useNavigate, useLocation } from "react-router-dom";

export default function useThisLocation() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  function setNavigation() {
    let url = null;
    if (path === "/ireland") {
      navigate("/");
    }
    if (path === "/") {
      navigate("/ireland");
    }
  }
  return {
    path,
    navi: setNavigation,
  };
}

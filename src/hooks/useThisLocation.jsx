import { useNavigate, useLocation } from "react-router-dom";

export default function useThisLocation() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  function setNavigation() {
    const navigat = path === "/ireland" ? "/" : "/ireland";

    navigate(navigat);
  }
  return{
    path,
    navi:setNavigation
  }
}

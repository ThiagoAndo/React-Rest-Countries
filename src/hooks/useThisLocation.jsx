import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useThisLocation() {
  const country = useSelector((state) => state.location.loc);
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  function setNavigation() {
    if (!path.includes("weather")) {
      if (country?.country === "IE") {
        if (path === "/Ireland") {
          navigate("/");
        }
        if (path === "/") {
          navigate("/Ireland");
        }
      } else if (country?.country != "IE" && path === "/Ireland") {
        navigate("/");
      } else {
        navigate(country?.country, { state: true });
      }
    } else {
      if (path.includes("/Ireland")) {
        navigate("/Ireland");
      } else {
        navigate(path.split("/weather")[0]);
      }
    }
  }
  return {
    path,
    navi: setNavigation,
  };
}

import { Outlet } from "react-router-dom";
import { ModeAction } from "../store/context/mode";
import { useContext } from "react";
import ScroolBtn from "../components/ui/scrollTop";
import MainNavigation from "../components/countryComponents/MainNavigation";
function RootLayout() {
  const context = useContext(ModeAction);

  return (
    <>
      <main id="container" className={context.mode ? "blight" : "bDark"}>
        <MainNavigation />
        <ScroolBtn />
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

import { Outlet } from "react-router-dom";
import { ModeAction } from "../store/context/mode";
import { useContext } from "react";
import MainNavigation from "../components/MainNavigation";
function RootLayout() {
  const context = useContext(ModeAction);

  return (
    <>
      <main id="container" className={context.mode ? "blight" : "bDark"}>
        <MainNavigation />
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

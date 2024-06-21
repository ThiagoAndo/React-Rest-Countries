import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <main id="container" className="bDark">
        <MainNavigation />
          <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

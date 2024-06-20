import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import Search from "../components/Search";
function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <main id="container" className="bDark">
        <MainNavigation />
        <Search />
        <section id="main" className="bDark">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default RootLayout;

import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        <section id="main">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default RootLayout;

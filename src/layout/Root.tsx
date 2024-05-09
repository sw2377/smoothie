import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function RootLayout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div
        className={`${location.pathname === "/" ? "w-full px-0" : "max-w-[1200px] px-6"} min-h-screen mx-auto my-0 pt-16`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;

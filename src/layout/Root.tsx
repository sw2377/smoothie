import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function RootLayout() {
  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto my-0 pt-20 px-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;

import HeaderLeftSide from "../components/header/HeaderLeftSide";
import HeaderRightSide from "../components/header/HeaderRightSide";

function Header() {
  return (
    <header className="fixed top-0 z-100 flex justify-between items-center w-full h-20 p-6 shadow bg-white">
      <HeaderLeftSide />
      <HeaderRightSide />
    </header>
  );
}

export default Header;

import { useState } from "react";
import SideMenu from "../../components/mypage/SideMenu";

function MyInfo() {
  const [selectedMenu, setSelectedMenu] = useState("myinfo");

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <main className="w-full md:w-3/4 md:px-6 items-start">
        <div className="flex flex-col gap-16 w-full">
          <section></section>
        </div>
      </main>
    </div>
  );
}

export default MyInfo;

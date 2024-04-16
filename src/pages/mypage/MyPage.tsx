import { useState } from "react";
import SideMenu from "../../components/mypage/SideMenu";
import Profile from "./Profile";
import Summary from "./Summary";

function MyPageWrapper() {
  const [selectedMenu, setSelectedMenu] = useState("profile");

  return (
    <div className="flex h-screen">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {selectedMenu === "profile" && <Profile />}
      {selectedMenu === "summary" && <Summary />}
    </div>
  );
}

export default MyPageWrapper;

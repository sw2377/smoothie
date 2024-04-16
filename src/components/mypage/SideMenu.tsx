import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { getProfile } from "../../store/slices/profileSlice";

interface SideMenuProps {
  selectedMenu: string;
  setSelectedMenu: (title: string) => void;
}

function SideMenu({ selectedMenu, setSelectedMenu }: SideMenuProps) {
  const { data } = useAppSelector(state => state.profiles);

  const userName = data?.user_name;
  const userEmail = data?.email;
  const userImageUrl = data?.avatar_url;
  const userPosition = data?.position;

  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const menu: {
    title: string;
    value: string;
    url: string;
    private?: boolean;
  }[] = [
    { title: "Summary", value: "summary", url: `/mypage/${id}/summary` },
    { title: "Profile", value: "profile", url: `/mypage/${id}/profile` },
    { title: "Peer Review", value: "review", url: `/mypage/${id}/review` },
    {
      title: "My Info",
      value: "myinfo",
      url: `/mypage/${id}/myInfo`,
      private: true,
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
    }
  }, [dispatch, id]);

  return (
    <div className="w-1/4 border-r-4 border-r-primary">
      {/* 프로필 */}
      <div className="flex flex-col items-center mt-[3.75rem] mb-10 ">
        <div className="overflow-hidden w-20 h-20 rounded-full my-3">
          <img src={userImageUrl} alt="" />
        </div>
        <div className="text-center">
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{userPosition}</p>
        </div>
      </div>

      {/* 메뉴 */}
      <ul>
        {menu.map(item => (
          <li
            key={item.title}
            className={`px-4 py-5 rounded-l-[36px] text-right cursor-pointer ${selectedMenu === item.value ? "bg-primary text-white font-bold" : "bg-slate-100"}`}
            onClick={() => setSelectedMenu(item.value)}
          >
            {item.title}
            {/* <Link to={item.url} className="block p-4">
              {item.title}
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;

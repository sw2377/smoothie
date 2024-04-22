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
    <div className="w-full md:w-1/4 md:border-r-4 md:border-r-primary">
      {/* 프로필 */}
      <div className="flex md:flex-col justify-center items-center mt-[3.75rem] mb-10">
        <div className="m-3 overflow-hidden w-20 h-20 rounded-full">
          <img src={userImageUrl} alt={`${userName}님의 프로필 사진`} />
        </div>
        <div className="md:text-center">
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{userPosition}</p>
        </div>
      </div>

      {/* 메뉴 */}
      <ul className="flex md:flex-col">
        {menu.map(item => (
          <li
            key={item.title}
            className={`w-full text-center rounded-t-3xl md:rounded-l-[36px] md:rounded-tr-none md:text-right cursor-pointer ${selectedMenu === item.value ? "bg-primary text-white font-bold" : "bg-slate-100"}`}
            onClick={() => setSelectedMenu(item.value)}
          >
            {/* {item.title} */}
            <Link to={item.url} className="block px-4 py-5">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;

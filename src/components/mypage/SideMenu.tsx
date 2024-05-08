import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { getProfile } from "../../store/slices/profileSlice";
import { getUser } from "../../app/supabase";
import ProfileImg from "../common/ProfileImg";

interface SideMenuProps {
  selectedMenu: string;
  setSelectedMenu: (title: string) => void;
}

function SideMenu({ selectedMenu, setSelectedMenu }: SideMenuProps) {
  const { data: userProfile } = useAppSelector(state => state.profiles);

  const [isAuthor, setIsAuthor] = useState(false);

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

  useEffect(() => {
    getUser().then(data => {
      if (data?.id === id) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    });
  }, []);

  return (
    <div className="w-full md:w-1/4 md:border-r-4 md:border-r-primary">
      {/* 프로필 */}
      <div className="flex md:flex-col justify-center items-center mt-[3.75rem] mb-10">
        {userProfile ? (
          <>
            <div className="m-3 w-20 h-20">
              <ProfileImg
                avatarUrl={userProfile.avatar_url}
                userName={userProfile.user_name}
              />
            </div>
            <div className="md:text-center">
              <p>{userProfile.user_name}</p>
              <p>{userProfile.email}</p>
              <p>{userProfile.position}</p>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* 메뉴 */}
      <ul className="flex md:flex-col">
        {menu.map(item => {
          if (item.private !== true) {
            return (
              <li
                key={item.title}
                className={`w-full text-center rounded-t-3xl md:rounded-l-[36px] md:rounded-tr-none md:text-right cursor-pointer ${selectedMenu === item.value ? "bg-primary text-white font-bold" : "bg-slate-100"}`}
                onClick={() => setSelectedMenu(item.value)}
              >
                <Link to={item.url} className="block px-4 py-5">
                  {item.title}
                </Link>
              </li>
            );
          }
        })}
        {isAuthor &&
          menu.map(item => {
            if (item.private === true) {
              return (
                <li
                  key={item.title}
                  className={`w-full text-center rounded-t-3xl md:rounded-l-[36px] md:rounded-tr-none md:text-right cursor-pointer ${selectedMenu === item.value ? "bg-primary text-white font-bold" : "bg-slate-100"}`}
                  onClick={() => setSelectedMenu(item.value)}
                >
                  <Link to={item.url} className="block px-4 py-5">
                    {item.title}
                  </Link>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}

export default SideMenu;

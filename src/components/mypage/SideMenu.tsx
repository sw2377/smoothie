import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { getProfile } from "../../store/slices/profileSlice";
import { getUser } from "../../utils/supabase/getAuthInfo";
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
    { title: "Review", value: "review", url: `/mypage/${id}/review` },
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
    <div className="w-full md:w-1/4 md:border-r md:border-r-gray_5">
      {/* 프로필 */}
      <div className="flex md:flex-col justify-center items-center mt-10 mb-14">
        {userProfile ? (
          <>
            <div className="m-3 w-20 h-20">
              <ProfileImg
                avatarUrl={userProfile.avatar_url}
                userName={userProfile.user_name}
              />
            </div>
            <div className="text-sm md:text-center">
              <p>{userProfile.user_name}</p>
              <p>{userProfile.email}</p>
              <p>{userProfile.position || "포지션: 등록전"}</p>
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
                className={`w-full text-center text-sm font-bold rounded-t-3xl md:rounded-t-none md:rounded-tl-[40px] md:rounded-bl-[40px] md:text-right cursor-pointer ${selectedMenu === item.value ? "bg-[#FFEAEF]" : "bg-white "}`}
                onClick={() => setSelectedMenu(item.value)}
              >
                <Link to={item.url} className="block px-4 md:px-6 py-5">
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
                  className={`w-full text-center text-sm font-bold rounded-t-3xl  md:rounded-t-none md:rounded-tl-[40px] md:rounded-bl-[40px] md:text-right cursor-pointer ${selectedMenu === item.value ? "bg-[#FFEAEF]" : "bg-white"}`}
                  onClick={() => setSelectedMenu(item.value)}
                >
                  <Link to={item.url} className="block px-4 md:px-6 py-5">
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

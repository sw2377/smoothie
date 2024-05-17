import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import SmoothieLgooSVG from "../assets/logo.svg?react";
import ActionButton from "../components/UI/button/ActionButton";
import { Menu, X } from "lucide-react";

import Logout from "../pages/auth/Logout";
import { ProfileDataType } from "../model/profile.types";
import { getProfile } from "../store/slices/profileSlice";
import ProfileImg from "../components/common/ProfileImg";

const nav: { name: string; url: string; filter: "category" | "auth" }[] = [
  {
    name: "프로필카드",
    url: "/usercardlist",
    filter: "category",
  },
  {
    name: "팀원모집",
    url: "/projectlist",
    filter: "category",
  },
  {
    name: "Log In",
    url: "/login",
    filter: "auth",
  },
  {
    name: "Sign Up",
    url: "/signup",
    filter: "auth",
  },
];

const categoryList = nav.filter(item => item.filter === "category");
const authList = nav.filter(item => item.filter === "auth");

function Header() {
  const { isLoggedIn, currentUserId } = useAppSelector(state => state.auth);
  const { isLoading: profileStateIsLoading } = useAppSelector(
    state => state.profiles,
  );

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<ProfileDataType | null>(null);

  // 로그인 되었다면 currentUser 가져오기
  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUser(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (currentUserId) {
          const profile = await dispatch(getProfile(currentUserId)).unwrap();
          setCurrentUser(profile);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoggedIn && currentUserId) {
      fetchUserProfile();
    }
  }, [isLoggedIn, currentUserId, dispatch]);

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenMenu]);

  const mobileMenuToggle = () => {
    setIsOpenMenu(prev => !prev);
  };

  // console.log(
  //   "📌 isLoaggedIn",
  //   isLoggedIn,
  //   "📌 currentUser",
  //   currentUser,
  //   "📌 currentUserId",
  //   currentUserId,
  // );

  return (
    <>
      <header className="fixed top-0 z-40 flex justify-center items-center w-full h-16 p-6 bg-white border-b border-b-gray_5">
        <div className="flex justify-between items-center gap-4 w-full max-w-[1200px] md:px-6 sm:justify-normal">
          <h1 className="transition ease duration-300 hover:scale-105">
            <Link to="/">
              <SmoothieLgooSVG width="50" height="50" />
            </Link>
          </h1>
          {/* w-640px 이상일 경우 */}
          <div className="hidden sm:flex items-center gap-5 mr-auto">
            <nav>
              <ul className="flex gap-5">
                {categoryList.map(list => (
                  <li
                    key={list.name}
                    className={`text-sm font-bold hover:text-primary ${location.pathname === list.url ? "text-primary" : "text-gray_1"}`}
                  >
                    <Link to={list.url}>{list.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-6">
              {profileStateIsLoading && <span>Loading...</span>}
              {!profileStateIsLoading && currentUser && (
                <>
                  <Link
                    to={`/mypage/${currentUserId}`}
                    className="flex gap-2 items-center"
                  >
                    <ProfileImg
                      avatarUrl={currentUser.avatar_url}
                      userName={currentUser.user_name}
                      size="w-[50px]"
                    />
                    <span>{currentUser.user_name}</span>
                  </Link>
                </>
              )}
              <Logout />
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              {authList.map(list => (
                <ActionButton
                  key={list.name}
                  handleClick={() => navigate(list.url)}
                >
                  {list.name}
                </ActionButton>
              ))}
            </div>
          )}

          {/* w-640px 미만일 경우 */}
          <div className="flex sm:hidden">
            <button
              className="border-none px-0 py-0"
              onClick={mobileMenuToggle}
            >
              <Menu size={40} />
            </button>
            {isOpenMenu && (
              <nav className="flex flex-col gap-10 absolute top-0 right-0 w-full h-screen p-6 bg-secondary">
                <button
                  onClick={() => setIsOpenMenu(prev => !prev)}
                  className="border-none px-0 py-0 self-end"
                >
                  <X size={40} />
                </button>
                <ul>
                  {categoryList.map(list => (
                    <li
                      key={list.name}
                      className={`py-2 text-5xl font-bold hover:text-primary ${location.pathname === list.url ? "text-primary" : "text-gray_1"}`}
                      onClick={mobileMenuToggle}
                    >
                      <Link to={list.url}>{list.name}</Link>
                    </li>
                  ))}
                </ul>
                {isLoggedIn ? (
                  <div className="mt-auto">
                    {profileStateIsLoading && <span>Loading...</span>}
                    {!profileStateIsLoading && currentUser && (
                      <>
                        <Link
                          to={`/mypage/${currentUserId}`}
                          className="flex gap-2 items-center my-4"
                          onClick={mobileMenuToggle}
                        >
                          <ProfileImg
                            avatarUrl={currentUser.avatar_url}
                            userName={currentUser.user_name}
                            size="w-[50px]"
                          />
                          <span>{currentUser.user_name}</span>
                        </Link>
                      </>
                    )}
                    <div className="pt-5 border-t border-gray_5">
                      <Logout /> {/* 임시 버튼형태의 로그아웃 */}
                    </div>
                  </div>
                ) : (
                  <ul className="mt-auto pt-5 border-t border-gray_5">
                    {authList.map(list => (
                      <li
                        key={list.name}
                        className={`py-2 text-3xl font-bold hover:text-primary ${location.pathname === list.url ? "text-primary" : "text-gray_1"}`}
                        onClick={mobileMenuToggle}
                      >
                        <Link to={list.url}>{list.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { getProfile } from "../../store/slices/profileSlice";

import profileDefaultImg from "../../assets/profile-default.svg";
import { ProfileDataType } from "../../model/profile.types";

function SideMenu() {
  const { data } = useAppSelector(state => state.profiles);
  console.log(data);
  const [userData, setUserData] = useState<ProfileDataType | null>(null);
  console.log(userData);

  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const menu: { title: string; url: string; private?: boolean }[] = [
    { title: "내가 쓴 글", url: `/mypage/${id}/summary` },
    { title: "프로필", url: `/mypage/${id}/profile` },
    { title: "리뷰", url: `/mypage/${id}/review` },
    { title: "내 정보", url: `/mypage/${id}/myInfo`, private: true },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
      data && setUserData(data[0]);
      //   .unwrap()
      //   .then(data => {
      //     console.log("GET PROFILE 성공");
      //     data && setUserData(data[0]);
      //   });
      // // .catch(error => {
      // //   console.warn(error);
      // // });
    }
  }, [dispatch, id]);

  return (
    <div className="w-1/4 border-r-4 border-r-primary">
      {/* 프로필 */}
      <div className="flex flex-col items-center mt-[3.75rem] mb-10 ">
        <div className="overflow-hidden w-20 h-20 rounded-full my-3">
          <img
            src={userData?.avatar_url}
            alt={`${userData?.user_name}의 프로필 사진`}
          />
        </div>
        <div className="text-center">
          <p>{userData?.user_name}</p>
          <p>{userData?.email}</p>
          <p>{userData?.position || "임시포지션"}</p>
        </div>
      </div>

      {/* 메뉴 */}
      <ul>
        {menu.map(item => (
          <li
            key={item.title}
            className="rounded-l-[36px] text-right bg-slate-100"
          >
            <Link to={item.url} className="block p-4">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;

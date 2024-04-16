// import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function SideMenu() {
  const { id } = useParams<{ id: string }>();

  const menu: { title: string; url: string; private?: boolean }[] = [
    { title: "내가 쓴 글", url: `/mypage/${id}/summary` },
    { title: "프로필", url: `/mypage/${id}/profile` },
    { title: "리뷰", url: `/mypage/${id}/review` },
    { title: "내 정보", url: `/mypage/${id}/myInfo`, private: true },
  ];

  return (
    <div className="w-1/4 border-r-4 border-r-primary">
      {/* 프로필 */}
      <div className="mt-[3.75rem] mb-4 border border-black flex flex-col items-center">
        <div className="overflow-hidden w-[50px] h-[50px] rounded-full my-3 border border-black">
          <img src="" alt="img" />
        </div>
        <div>
          <p>nickname</p>
          <p>email</p>
          <p>position</p>
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

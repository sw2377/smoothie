import { useState } from "react";
import SideMenu from "../../components/mypage/SideMenu";

function Review() {
  const [selectedMenu, setSelectedMenu] = useState("review");

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <main className="w-full md:w-3/4 md:px-6 items-start">
        <div className="flex flex-col gap-16 w-full">
          <section>
            <h3 className="mb-4 text-2xl font-bold">
              죠르디 님과 프로젝트를 함께한 동료
            </h3>
            <p className="pb-4">(임시) 죠르디 님은 이런 동료입니다!</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <li className="overflow-hidden border rounded-2xl shadow-sm">
                <div className="flex flex-col gap-4 p-4 bg-primary text-white">
                  <span className="inline-block w-full text-xs text-right">
                    2024.09.11
                  </span>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-xs">함께한 프로젝트</span>
                      <span className="block font-bold">메인 프로젝트</span>
                    </div>
                    <div className="overflow-hidden w-[60px] h-[60px] rounded-full">
                      <a href="">
                        <img
                          className="h-full"
                          src="https://images.unsplash.com/photo-1642953702322-a5da05d2e36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="block font-bold">리뷰 제목입니다.</span>
                  <p className="text-sm">
                    리뷰 내용입니다. 프로젝트 하면서 정말 열심히 했어요!
                    죠르디님은 성실하고, 팀 프로젝트를 위한 의견을 자주 내던
                    분이었습니다. 함께 프로젝트를 해서 즐겁고 좋았어요!
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Review;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store";
import { getUser } from "../../app/supabase";
import { getProfile } from "../../store/slices/profileSlice";
import GetTechLogo from "../../components/common/GetTechLogo";
import { extractTextAfterColon } from "../../utils/exceptColonFromTechResponse";
import Loading from "../../components/common/Loading";

import SideMenu from "../../components/mypage/SideMenu";

function Profile() {
  const { isLoading, data: userProfile } = useAppSelector(
    state => state.profiles,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isAuthor, setIsAuthor] = useState(false);

  const { id } = useParams<{ id: string }>();

  const techTagNames = extractTextAfterColon(userProfile?.tech_tags);

  useEffect(() => {
    getUser().then(data => {
      if (data?.id === id) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
    }
  }, [dispatch, id]);

  const [selectedMenu, setSelectedMenu] = useState("profile");

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col min-h-screen md:flex-row">
        <SideMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <main className="w-full md:w-3/4 md:px-6 items-start">
          <div className="w-full">
            {isAuthor ? (
              <div className="text-right">
                <button
                  className="border-none"
                  onClick={() => navigate(`/mypage/${id}/profile/edit`)}
                >
                  <Pencil className="text-gray_4 hover:text-black" />
                </button>
              </div>
            ) : null}
            <div className="flex flex-col gap-16 w-full">
              <section>
                <h3 className="mb-4 text-2xl font-bold">저를 소개합니다</h3>
                <div>{userProfile?.cover_letter}</div>
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">기술 스택</h3>
                <ul className="flex flex-wrap gap-2">
                  {techTagNames?.map(techName => {
                    return (
                      <li key={techName} className="flex flex-col items-center">
                        <GetTechLogo logoTitle={techName} style="w-14 h-14" />
                        <span className="mt-2 text-xs text-gray_3">
                          {techName}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">하드 스킬</h3>
                <ul className="flex flex-wrap gap-2">
                  {userProfile?.hard_skills.map(skill => {
                    return (
                      <li
                        key={skill}
                        className="flex items-center px-4 py-2 bg-secondary rounded-3xl text-sm"
                      >
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">소프트 스킬</h3>
                <ul className="flex flex-wrap gap-2">
                  {userProfile?.soft_skills.map(skill => {
                    return (
                      <li
                        key={skill}
                        className="flex items-center px-4 py-2 bg-secondary rounded-3xl text-sm font-medium"
                      >
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">참여한 프로젝트</h3>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;

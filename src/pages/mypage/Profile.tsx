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
    <div className="flex h-screen">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <main className="w-3/4 px-6 items-start">
        <div className="flex flex-col gap-16 w-full">
          {isLoading && <Loading />}
          <div>
            {isAuthor ? (
              <button onClick={() => navigate(`/mypage/${id}/profile/edit`)}>
                <Pencil />
              </button>
            ) : null}
          </div>
          <section>
            <h3 className="text-2xl font-bold">저를 소개합니다.</h3>
            <div>{userProfile?.cover_letter}</div>
          </section>
          <section>
            <h3 className="text-2xl font-bold">기술 스택</h3>
            <ul className="flex flex-wrap gap-2">
              {techTagNames?.map(techName => {
                return (
                  <li key={techName} className="w-10 h-10">
                    <GetTechLogo logoTitle={techName} />
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold">하드 스킬</h3>
            <ul>
              {userProfile?.hard_skills.map(skill => {
                return <li key={skill}>{skill}</li>;
              })}
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold">소프트 스킬</h3>
            <ul>
              {userProfile?.soft_skills.map(skill => {
                return <li key={skill}>{skill}</li>;
              })}
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold">참여한 프로젝트</h3>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Profile;

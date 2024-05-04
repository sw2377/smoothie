import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store";
import { getUser } from "../../app/supabase";
import { getProfile } from "../../store/slices/profileSlice";
import GetTechLogo from "../../components/common/GetTechLogo";
import { extractTextAfterColon } from "../../utils/exceptColonFromTechResponse";
import Loading from "../../components/common/Loading";

import SideMenu from "../../components/mypage/SideMenu";
import NoContent from "../../components/common/NoContent";

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
                {userProfile?.cover_letter ? (
                  <div>{userProfile?.cover_letter}</div>
                ) : (
                  <NoContent />
                )}
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">기술 스택</h3>
                {techTagNames ? (
                  <ul className="flex flex-wrap gap-2">
                    {techTagNames.map(techName => {
                      return (
                        <li
                          key={techName}
                          className="flex flex-col items-center"
                        >
                          <GetTechLogo logoTitle={techName} style="w-14 h-14" />
                          <span className="mt-2 text-xs text-gray_3">
                            {techName}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <NoContent />
                )}
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">하드 스킬</h3>

                {userProfile?.hard_skills ? (
                  <ul className="flex flex-wrap gap-2">
                    {userProfile.hard_skills.map(skill => {
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
                ) : (
                  <NoContent />
                )}
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">소프트 스킬</h3>
                {userProfile?.soft_skills ? (
                  <ul className="flex flex-wrap gap-2">
                    {userProfile.soft_skills.map(skill => {
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
                ) : (
                  <NoContent />
                )}
              </section>
              <section>
                <h3 className="mb-4 text-2xl font-bold">참여한 프로젝트</h3>
                {userProfile?.projects ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {userProfile.projects.map(project => {
                      return (
                        <li
                          key={project.id}
                          className={`relative w-full h-[150px] mb-10 border rounded-2xl bg-no-repeat bg-cover bg-center bg-default_profile`}
                        >
                          <Link
                            to={project.repo_url}
                            target="_blank"
                            className="block w-full h-full"
                          >
                            {project.inside_project && (
                              <span className="absolute top-1 right-1 px-3 py-1 bg-primary text-white rounded-xl text-xs">
                                스무디프로젝트
                              </span>
                            )}
                          </Link>
                          <span className="block pt-2 sm:text-center">
                            {project.title}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <NoContent />
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;

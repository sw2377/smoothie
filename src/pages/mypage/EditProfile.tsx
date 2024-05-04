import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../store";
import SideMenu from "../../components/mypage/SideMenu";
import TextInput from "../../components/UI/TextInput";
import { Plus, Trash2 } from "lucide-react";
import ActionButton from "../../components/UI/button/ActionButton";
import { modifiedProfile } from "../../store/slices/profileSlice";
import TextTag from "../../components/UI/TextTag";
import { fetchTechTags } from "../../store/slices/techTagsSlice";
import GetTechLogo from "../../components/common/GetTechLogo";
import { ProjectDataType } from "../../model/profile.types";
import { addProject, removeProject } from "../../store/slices/projectSlice";

interface AddProjectDataType {
  title: string;
  description: string;
  repo_url: string;
  image_url?: string;
}

function EditProfile() {
  const { data: userProfile } = useAppSelector(state => state.profiles);
  const { data: techTags } = useAppSelector(state => state.techtags);
  console.log("userProfile", userProfile);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("profile");

  /** 자기소개 */
  const [coverLetter, setCoverLetter] = useState("");

  /** 기술스택 */
  // const [techTags, setTechTags] = useState();
  // const techTagNames = techTags.map(list => list.name);
  const [userTechTags, setUserTechTags] = useState<string[]>([]);

  /** 하드스킬 */
  const [hardSkills, setHardSkills] = useState<string[]>([]);

  // 하드스킬추가
  const addHardSkill = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X

    // 같은 하드스킬 추가 금지
    if (!hardSkills.includes(trimKeyword)) {
      setHardSkills(prev => {
        return [...prev, trimKeyword];
      });
    }
  };

  // 하드스킬 삭제
  const removeHardSkill = (targetSkill: string) => {
    const updatedSkill = hardSkills.filter(skill => skill !== targetSkill);
    setHardSkills(updatedSkill);
  };

  /** 소프트스킬 */
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  // 소프트스킬추가
  const addSoftSkill = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X

    // 같은 소프트스킬 추가 금지
    if (!softSkills.includes(trimKeyword)) {
      setSoftSkills(prev => {
        return [...prev, trimKeyword];
      });
    }
  };

  // 소프트스킬 삭제
  const removeSoftSkill = (targetSkill: string) => {
    const updatedSkill = softSkills.filter(skill => skill !== targetSkill);
    setSoftSkills(updatedSkill);
  };

  /** 프로젝트 */
  const [projects, setProjects] = useState<ProjectDataType[]>();
  const [isAddProjectBtnActive, setIsAddProjectBtnActive] = useState(false);
  const [isRemoveProjectBtnActive, setIsRemoveProjectBtnActive] =
    useState(false);
  console.log("PROJECT", projects);

  const handleAddProjectBtnClick = () => {
    setIsAddProjectBtnActive(!isAddProjectBtnActive);
  };

  const handleRemoveProjectBtnClick = () => {
    setIsRemoveProjectBtnActive(!isRemoveProjectBtnActive);
  };

  // 프로젝트 삭제
  const handleRemoveProject = (targetId: number) => {
    if (
      isRemoveProjectBtnActive &&
      window.confirm("프로젝트를 정말 삭제하시겠습니까?")
    ) {
      dispatch(removeProject(targetId))
        .unwrap()
        .then(() => {
          const updatedProject = projects?.filter(
            project => project.id !== targetId,
          );
          setProjects(updatedProject);
          setIsRemoveProjectBtnActive(false);
        });
    }
  };

  // 프로젝트 추가
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectDataType>({});

  const onSubmit: SubmitHandler<AddProjectDataType> = data => {
    console.log(data);

    if (window.confirm("프로젝트를 추가하시겠습니까?")) {
      const reqData = {
        title: data.title,
        description: data.description,
        repo_url: data.repo_url,
        image_url: data.image_url,
        inside_project: false, // 임시
        profile_id: userProfile?.id, // 임시
      };

      dispatch(addProject(reqData));

      setProjects(prev => {
        return [...prev, reqData];
      });

      reset();
      setIsAddProjectBtnActive(false);
    }
  };

  // 초기 상태
  useEffect(() => {
    dispatch(fetchTechTags());

    if (userProfile) {
      setCoverLetter(userProfile.cover_letter);
      setUserTechTags(userProfile.tech_tags);
      setHardSkills(userProfile.hard_skills);
      setSoftSkills(userProfile.soft_skills);
      setProjects(userProfile.projects);
    }
  }, []);

  // 수정/취소 버튼 클릭
  const handleActionBtnClick = () => {
    console.log("handleActionBtnClick");
    const reqData = {
      cover_letter: coverLetter,
      tech_tags: userTechTags,
      hard_skills: hardSkills,
      soft_skills: softSkills,
      // projects: projects,
    };

    console.log("🔖 REQ DATA", reqData);

    if (window.confirm("프로필을 수정하시겠습니까?")) {
      const targetId = userProfile?.id;
      dispatch(modifiedProfile({ targetId, reqData }))
        .unwrap()
        .then(() => {
          alert("프로필이 수정되었습니다.");
          navigate(`/mypage/${targetId}/profile`);
        })
        .catch(error => {
          console.warn("❌ ERROR : MODIFIED USER PROFILE", error);
          alert(error.message);
        });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <main className="w-full md:w-3/4 md:px-6 items-start">
        <div className="flex flex-col gap-16 w-full">
          <section>
            <h3 className="mb-4 text-2xl font-bold">저를 소개합니다.</h3>
            <textarea
              className="w-full min-h-48 resize-none"
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
            />
          </section>
          <section>
            <h3 className="mb-4 text-2xl font-bold">기술 스택</h3>
            <ul className="flex flex-wrap gap-2">
              {techTags.map(item => {
                return (
                  <li
                    key={item.id}
                    className={`overflow-hidden flex items-center cursor-pointer border rounded-3xl text-sm ${userTechTags && userTechTags.includes(item.name) ? "bg-secondary border-yellow-200 font-bold" : ""}`}
                    onClick={() =>
                      setUserTechTags(prev => [...prev, item.name])
                    }
                  >
                    <GetTechLogo
                      logoTitle={item.name}
                      style="w-10 h-10 p-2 rounded-full"
                    />
                    <span className="pr-2">{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h3 className="mb-4 text-2xl font-bold">하드 스킬</h3>
            <div className="flex flex-col gap-3">
              <ul className="flex flex-wrap gap-2">
                {hardSkills?.map(skill => (
                  <TextTag
                    key={skill}
                    text={skill}
                    onDelete={removeHardSkill}
                  />
                ))}
              </ul>
              <TextInput
                placeholder="Enter를 눌러 추가할 수 있습니다."
                onSubmit={skill => addHardSkill(skill)}
              >
                <Plus color="#BDBDBD" />
              </TextInput>
            </div>
          </section>
          <section>
            <h3 className="mb-4 text-2xl font-bold">소프트 스킬</h3>
            <div className="flex flex-col gap-3">
              <ul className="flex flex-wrap gap-2">
                {softSkills?.map(skill => (
                  <TextTag
                    key={skill}
                    text={skill}
                    onDelete={removeSoftSkill}
                  />
                ))}
              </ul>
              <TextInput
                placeholder="Enter를 눌러 추가할 수 있습니다."
                onSubmit={skill => addSoftSkill(skill)}
              >
                <Plus color="#BDBDBD" />
              </TextInput>
            </div>
          </section>
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="mb-4 text-2xl font-bold">참여한 프로젝트</h3>
              <div>
                <button
                  className="border-none px-2"
                  onClick={handleAddProjectBtnClick}
                >
                  <Plus className="text-gray_4 hover:text-black" />
                </button>
                <button
                  className="border-none px-2"
                  onClick={handleRemoveProjectBtnClick}
                >
                  {isRemoveProjectBtnActive ? (
                    <span className="text-[#EB5757] font-bold">
                      삭제할 프로젝트를 선택해 주세요.
                    </span>
                  ) : (
                    <Trash2 className="text-gray_4 hover:text-black" />
                  )}
                </button>
              </div>
            </div>
            {/* 참여한 프로젝트 추가 */}
            {isAddProjectBtnActive ? (
              <div className="border border-gray_4 rounded-2xl p-8 mb-5 shadow-sm">
                <form
                  className="flex flex-col gap-5 w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="min-w-32 font-bold">프로젝트 명</label>
                      <input
                        {...register("title", {
                          required: "프로젝트 명을 입력해 주세요.",
                        })}
                        type="text"
                        placeholder="프로젝트 명을 입력해 주세요."
                        className="w-full"
                      />
                    </div>
                    {errors.title && (
                      <span className="text-xs text-error text-right">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="min-w-32 font-bold">한줄 설명</label>
                      <input
                        {...register("description", {
                          required: "프로젝트 설명을 입력해 주세요.",
                        })}
                        type="text"
                        placeholder="간단한 설명을 입력해 주세요."
                        className="w-full"
                      />
                    </div>
                    {errors.description && (
                      <span className="text-xs text-error text-right">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="min-w-32 font-bold">
                        Repository URL
                      </label>
                      <input
                        {...register("repo_url", {
                          required: "깃허브 저장소의 url을 입력해 주세요.",
                        })}
                        type="text"
                        placeholder="깃허브 저장소의 url을 입력해 주세요."
                        className="w-full"
                      />
                    </div>
                    {errors.repo_url && (
                      <span className="text-xs text-error text-right">
                        {errors.repo_url.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="min-w-32 font-bold">
                        Thumbnail URL
                      </label>
                      <input
                        {...register("image_url")}
                        type="text"
                        placeholder="썸네일로 사용될 이미지 url을 입력해 주세요."
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <ActionButton
                      type="outline"
                      handleClick={() => {
                        reset();
                        setIsAddProjectBtnActive(false);
                      }}
                    >
                      취소
                    </ActionButton>
                    <ActionButton handleClick={handleSubmit(onSubmit)}>
                      추가하기
                    </ActionButton>
                  </div>
                </form>
              </div>
            ) : null}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {projects?.map(project => {
                return (
                  <li
                    key={project.id}
                    className={`relative w-full h-[150px] mb-10 border rounded-2xl bg-no-repeat bg-cover bg-center bg-default_profile ${isRemoveProjectBtnActive ? "cursor-pointer" : ""}`}
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <div className="block w-full h-full">
                      {project.inside_project && (
                        <span className="absolute top-1 right-1 px-3 py-1 bg-primary text-white rounded-xl text-xs">
                          스무디프로젝트
                        </span>
                      )}
                    </div>
                    <span className="block pt-2 sm:text-center">
                      {project.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
          <div className="flex gap-2 justify-end">
            <ActionButton
              type="outline"
              handleClick={() => {
                if (window.confirm("프로필 수정을 취소하시겠습니까?")) {
                  navigate(`/mypage/${userProfile?.id}/profile`, {
                    replace: true,
                  });
                }
              }}
            >
              취소
            </ActionButton>
            <ActionButton handleClick={handleActionBtnClick}>
              수정하기
            </ActionButton>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;

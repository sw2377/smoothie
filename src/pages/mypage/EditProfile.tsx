import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import SideMenu from "../../components/mypage/SideMenu";
import TextInput from "../../components/UI/TextInput";
import { Plus } from "lucide-react";
import ActionButton from "../../components/UI/button/ActionButton";
import { modifiedProfile } from "../../store/slices/profileSlice";
import TextTag from "../../components/UI/TextTag";
import { fetchTechTags } from "../../store/slices/techTagsSlice";
import GetTechLogo from "../../components/common/GetTechLogo";

function EditProfile() {
  const { data: userProfile } = useAppSelector(state => state.profiles);
  const { data: techTags } = useAppSelector(state => state.techtags);
  console.log("userProfile", userProfile);
  console.log("techTags", techTags);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("profile");

  /** 자기소개 */
  const [coverLetter, setCoverLetter] = useState("");

  /** 기술스택 */
  // const [techTags, setTechTags] = useState();
  // const techTagNames = techTags.map(list => list.name);
  const [userTechTags, setUserTechTags] = useState<string[]>([]);
  console.log("userTechTags", userTechTags);

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

  useEffect(() => {
    dispatch(fetchTechTags());

    if (userProfile) {
      setCoverLetter(userProfile.cover_letter);
      setUserTechTags(userProfile.tech_tags);
      setHardSkills(userProfile.hard_skills);
      setSoftSkills(userProfile.soft_skills);
    }
  }, []);

  const handleActionBtnClick = () => {
    console.log("handleActionBtnClick");
    const reqData = {
      cover_letter: coverLetter,
      tech_tags: userTechTags,
      hard_skills: hardSkills,
      soft_skills: softSkills,
      projects: [],
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
                    className={`overflow-hidden flex items-center cursor-pointer border rounded-3xl text-sm ${userTechTags.includes(item.name) ? "bg-secondary border-yellow-200 font-bold" : ""}`}
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
                {hardSkills.map(skill => (
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
                {softSkills.map(skill => (
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
            <h3 className="mb-4 text-2xl font-bold">참여한 프로젝트</h3>
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

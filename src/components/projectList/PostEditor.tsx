import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../QuillEditor.css";

import {
  addProjectCard,
  modifiedProjectCard,
} from "../../store/slices/projectCardListSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { ProjectCardListDataType } from "../../model/board.types";
import GetTechLogo from "../common/GetTechLogo";
import ActionButton from "../UI/button/ActionButton";
import TextTag from "../UI/TextTag";

import { session } from "../../app/supabase";
import { fetchTechTags } from "../../store/slices/techTagsSlice";

interface PostEditorPorps {
  originPost?: ProjectCardListDataType;
}

function PostEditor({ originPost }: PostEditorPorps) {
  // console.log("🔖 ORIGIN POST", originPost);
  const { data: techTags } = useAppSelector(state => state.techtags);

  useEffect(() => {
    dispatch(fetchTechTags());
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [content, setContent] = useState("");

  // react-quill
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "underline", "strike", "blockquote", "link"],
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    }),
    [],
  );

  interface ProjectFormDataType {
    title: string;
    // content: string;
    positionName: string;
    positionCount: number;
    techTags: string;
    startDate: string | Date;
    endDate: string | Date;
  }

  // react hook form
  const {
    register,
    getValues,
    resetField,
    // handleSubmit,
    // formState: { errors },
  } = useForm<ProjectFormDataType>();
  // const onSubmit: SubmitHandler<ProjectFormDataType> = data => {
  //   console.log(data);
  //   console.log(content);
  // };

  /** 포지션 */
  const [position, setPosition] = useState<string[]>([]); // ex. ["프론트엔드 1명", "백엔드 1명"]

  // 포지션 추가
  const addPosition = () => {
    const PositionName = getValues("positionName");
    const PositionCount = getValues("positionCount");

    // 포지션 이름과 인원이 모두 입력되어야 추가 가능
    if (!PositionName || !PositionCount) return;

    if (PositionName && PositionCount) {
      const positionNameAndCount = `${PositionName} ${PositionCount}명`;

      // 같은 포지션은 추가 금지
      if (!position.find(item => item.includes(PositionName))) {
        setPosition(prev => {
          return [...prev, positionNameAndCount];
        });

        resetField("positionName");
        resetField("positionCount");
      }
    }
  };

  // 포지션 삭제
  const removePosition = (targetPosition: string) => {
    const updatedPosition = position.filter(
      position => position !== targetPosition,
    );
    setPosition(updatedPosition);
  };

  /** 기술스택 */
  const [selectedTechTags, setSelectedTechTags] = useState<string[]>([]);

  // 기술스택 선택
  const handleTechTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;

    // 이미 선택된 기술스택 선택 금지
    if (!selectedTechTags.includes(selectedOption)) {
      setSelectedTechTags(prev => {
        return [...prev, selectedOption];
      });
    }
  };

  // 기술스택 삭제
  const removeTechTag = (targetTechTag: string) => {
    const updatedTechTags = selectedTechTags.filter(
      techTag => techTag !== targetTechTag,
    );
    setSelectedTechTags(updatedTechTags);
  };

  useEffect(() => {
    if (originPost) {
      setPosition(originPost.position);
      setSelectedTechTags(originPost.tech_tags);
      setContent(originPost.content as string);
    }
  }, [originPost]);

  // 모든 입력값이 채워졌는지 확인 // 임시
  const isFieldFilled = () => {
    const checkPosition = position.length === 0;
    const checkTechTags = selectedTechTags.length === 0;
    const checkContent = content.trim().length === 0;

    if (checkPosition || checkTechTags || checkContent) {
      return false;
    }

    return true;
  };

  /** ADD & MODIFIED */
  const handleActionBtnClick = async () => {
    const reqData = {
      title: getValues("title"),
      content: content,
      start_date: getValues("startDate"),
      end_date: getValues("endDate"),
      position: position,
      tech_tags: selectedTechTags,
      user_name: session?.user.user_metadata.user_name,
      avatar_url: session?.user.user_metadata.avatar_url,
    };

    // console.log("🔖 REQ DATA", reqData);

    if (!isFieldFilled()) {
      alert("입력칸을 모두 입력해 주세요.");
      return;
    }

    if (
      window.confirm(
        originPost ? "글을 수정하시겠습니까?" : "새로운 글을 작성하시겠습니까?",
      )
    ) {
      // 게시글 작성
      if (!originPost) {
        dispatch(addProjectCard(reqData))
          .unwrap()
          .then(() => {
            window.alert("새 글이 등록되었습니다.");
            navigate("/projectlist");
          })
          .catch(error => {
            console.warn("❌ ERROR : ADD PROJECT CARD", error);
            alert(error.message);
          });
      }

      // 게시글 수정
      if (originPost) {
        const targetId = originPost.id;
        dispatch(modifiedProjectCard({ targetId, reqData }))
          .unwrap()
          .then(() => {
            window.alert("게시글이 수정되었습니다.");
            navigate(`/projectlist/${targetId}`);
          })
          .catch(error => {
            console.warn("❌ ERROR : UPDATE PROJECT CARD", error);
            alert(error.message);
          });
      }
    }
  };

  return (
    <main>
      <div className="w-full">
        <form className="flex flex-col gap-6">
          {/* Title */}
          <h2 className="border-b border-gray_4">
            <input
              {...register("title", {
                required: "제목을 입력해 주세요.",
              })}
              type="text"
              placeholder="제목을 입력해 주세요."
              className="w-full border-none text-4xl px-0 placeholder:text-4xl"
              defaultValue={originPost?.title}
            />
          </h2>

          {/* Info */}
          <div className="flex flex-col gap-4 py-4">
            <dl className="flex items-center">
              <dt className="min-w-[204px] text-xl">프로젝트 예상기간</dt>
              <dd className="flex gap-2">
                <input
                  {...register("startDate", {
                    required: "시작 예정일을 선택해 주세요.",
                  })}
                  type="date"
                  className="py-2"
                  defaultValue={originPost?.start_date.toLocaleString()}
                />
                <input
                  {...register("endDate", {
                    required: "종료 예정일을 선택해 주세요.",
                  })}
                  type="date"
                  className="py-2"
                  defaultValue={originPost?.end_date.toLocaleString()}
                />
              </dd>
            </dl>
            <dl className="flex items-center">
              <dt className="min-w-[204px] text-xl">포지션 및 인원</dt>
              <dd className="flex gap-2">
                <select
                  {...register("positionName")}
                  className="py-2"
                  defaultValue={""}
                >
                  <option value="">포지션</option>
                  <option value="프론트엔드">프론트엔드</option>
                  <option value="백엔드">백엔드</option>
                  <option value="디자이너">디자이너</option>
                </select>
                <input
                  {...register("positionCount")}
                  type="number"
                  placeholder="00 명"
                  className="py-2 w-[100px]"
                />
                <button type="button" onClick={addPosition}>
                  추가
                </button>
              </dd>
            </dl>
            {position.length > 0 ? (
              <dl className="flex items-center">
                <dt className="min-w-[204px] invisible">
                  선택된 포지션 및 인원
                </dt>
                <dd>
                  <ul className="flex gap-2">
                    {position.map(position => (
                      <TextTag
                        key={position}
                        text={position}
                        onDelete={removePosition}
                      />
                    ))}
                  </ul>
                </dd>
              </dl>
            ) : null}
            <dl className="flex items-center">
              <dt className="min-w-[204px] text-xl">기술 스택</dt>
              <dd>
                <select
                  {...register("techTags")}
                  className="py-2"
                  defaultValue={""}
                  onChange={handleTechTagChange}
                >
                  <option value="">기술스택</option>
                  {techTags.map(techTag => (
                    <option key={techTag.id} value={techTag.name}>
                      {techTag.name}
                    </option>
                  ))}
                </select>
              </dd>
            </dl>
            {selectedTechTags.length > 0 ? (
              <dl className="flex items-center">
                <dt className="min-w-[204px] invisible">선택된 기술 스택</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {selectedTechTags.map(techName => (
                      <li
                        key={techName}
                        className="w-10 h-10"
                        onClick={() => removeTechTag(techName)}
                      >
                        <GetTechLogo logoTitle={techName} />
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            ) : null}
          </div>

          {/* Editor */}
          <div>
            <h3 className="mb-4 text-2xl">프로젝트 소개</h3>
            <ReactQuill
              theme="snow"
              placeholder="프로젝트를 소개해 주세요!"
              value={content}
              onChange={setContent}
              modules={modules}
              className="quillEditor"
            />
          </div>

          {/* Button Area */}
          <div className="flex gap-2 justify-end">
            <ActionButton
              type="outline"
              handleClick={() => {
                if (
                  window.confirm(
                    `글 ${originPost ? "수정" : "작성"}을 취소하시겠습니까?`,
                  )
                ) {
                  navigate("/projectlist", { replace: true });
                }
              }}
            >
              취소
            </ActionButton>
            <ActionButton handleClick={handleActionBtnClick}>
              {originPost ? "글 수정하기" : "글 등록하기"}
            </ActionButton>
          </div>
        </form>
      </div>
    </main>
  );
}

export default PostEditor;

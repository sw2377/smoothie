import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../QuillEditor.css";

import { ProjectListDataType } from "../../model/board.types";
import GetTechLogo from "../GetTechLogo";
import ActionButton from "../UI/button/ActionButton";
import TextTag from "../UI/TextTag";

interface PostEditorPorps {
  originPost?: ProjectListDataType;
}

function PostEditor({ originPost }: PostEditorPorps) {
  const navigate = useNavigate();

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

  // 임시 ReqDataType
  interface ProjectFormDataType {
    title: string;
    // content: string;
    positionName: string;
    positionCount: number;
    techTags: string[];
    startDate: string | Date;
    endDate: string | Date;
  }

  // react hook form
  const {
    register,
    // watch,
    getValues,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormDataType>();
  // const watchPositionName = watch("positionName");
  // const watchPositionCount = watch("positionCount");
  const onSubmit: SubmitHandler<ProjectFormDataType> = data =>
    console.log(data);

  /** 포지션 */
  const [position, setPosition] = useState<string[]>([]); // ex. ["프론트엔드 1명", "백엔드 1명"]
  // const requestPositionInfo = position.join(", "); // ex. "프론트엔드 1명, 백엔드 1명"

  // 포지션 추가
  const addPosition = () => {
    const PositionName = getValues("positionName");
    const PositionCount = getValues("positionCount");

    // 포지션 이름과 인원이 모두 입력되어야 추가 가능
    if (!PositionName || !PositionCount) return;

    if (PositionName && PositionCount) {
      console.log("addPosition");
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
  // 임시 techTags
  const techTags = [
    {
      id: 1,
      techName: "Java",
      tagType: "BACK_END",
    },
    {
      id: 2,
      techName: "Spring",
      tagType: "BACK_END",
    },
    {
      id: 3,
      techName: "Nodejs",
      tagType: "BACK_END",
    },
    {
      id: 4,
      techName: "Go",
      tagType: "BACK_END",
    },
    {
      id: 5,
      techName: "Express",
      tagType: "BACK_END",
    },
    {
      id: 6,
      techName: "MySQL",
      tagType: "BACK_END",
    },
    {
      id: 7,
      techName: "MongoDB",
      tagType: "BACK_END",
    },
    {
      id: 8,
      techName: "Python",
      tagType: "BACK_END",
    },
    {
      id: 9,
      techName: "Django",
      tagType: "BACK_END",
    },
    {
      id: 10,
      techName: "php",
      tagType: "BACK_END",
    },
    {
      id: 11,
      techName: "GraphQL",
      tagType: "BACK_END",
    },
    {
      id: 12,
      techName: "FireBase",
      tagType: "BACK_END",
    },
    {
      id: 13,
      techName: "JavaScript",
      tagType: "FRONT_END",
    },
    {
      id: 14,
      techName: "TypeScript",
      tagType: "FRONT_END",
    },
    {
      id: 15,
      techName: "React",
      tagType: "FRONT_END",
    },
    {
      id: 16,
      techName: "Vue",
      tagType: "FRONT_END",
    },
    {
      id: 17,
      techName: "Svelte",
      tagType: "FRONT_END",
    },
    {
      id: 18,
      techName: "Nextjs",
      tagType: "FRONT_END",
    },
    {
      id: 19,
      techName: "Flutter",
      tagType: "MOBILE",
    },
    {
      id: 20,
      techName: "Swift",
      tagType: "MOBILE",
    },
    {
      id: 21,
      techName: "Kotlin",
      tagType: "MOBILE",
    },
    {
      id: 22,
      techName: "ReactNative",
      tagType: "MOBILE",
    },
    {
      id: 23,
      techName: "Unity",
      tagType: "MOBILE",
    },
    {
      id: 24,
      techName: "AWS",
      tagType: "ETC",
    },
    {
      id: 25,
      techName: "Kubernetes",
      tagType: "ETC",
    },
    {
      id: 26,
      techName: "Docker",
      tagType: "ETC",
    },
    {
      id: 27,
      techName: "Git",
      tagType: "ETC",
    },
    {
      id: 28,
      techName: "Figma",
      tagType: "ETC",
    },
    {
      id: 29,
      techName: "Zeplin",
      tagType: "ETC",
    },
    {
      id: 30,
      techName: "Jest",
      tagType: "ETC",
    },
    {
      id: 31,
      techName: "C",
      tagType: "ETC",
    },
  ];
  const [selectedTechTag, setSelectedTechTag] = useState([]);

  // 기술스택 선택
  const handleTechTagChange = (selected: string) => {
    console.log("handleTechTagChange", selected);

    // 이미 선택된 기술스택 선택 금지
    if (!selectedTechTag.includes(selected)) {
      setTechTag(selected);
      setSelectedTechTag(prev => {
        return [...prev, selected];
      });
    }
  };

  // 기술스택 삭제
  const removeTechTag = (targetTechTag: string) => {
    console.log(targetTechTag);
    // const updatedTag = selectedTechTag.filter(tag => tag !== target);
    // setSelectedTechTag(updatedTag);
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <h2 className="border-b border-gray_4">
          <input
            {...register("title", {
              required: "제목을 입력해 주세요.",
            })}
            type="text"
            placeholder="제목을 입력해 주세요."
            className="w-full border-none text-4xl px-0 placeholder:text-4xl"
          />
          {/* {errors.title && window.alert(`${errors.title.message}`)} */}
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
              />
              <input
                {...register("endDate", {
                  required: "종료 예정일을 선택해 주세요.",
                })}
                type="date"
                className="py-2"
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
              <button onClick={addPosition}>추가</button>
            </dd>
          </dl>
          {position.length > 0 ? (
            <dl className="flex items-center">
              <dt className="min-w-[204px] invisible">선택된 포지션 및 인원</dt>
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
                onChange={() => handleTechTagChange}
              >
                <option value="">기술스택</option>
                {techTags.map(techTag => (
                  <option key={techTag.id} value={techTag.techName}>
                    {techTag.techName}
                  </option>
                ))}
              </select>
            </dd>
          </dl>
          {selectedTechTag.length > 0 ? (
            <dl>
              <dt className="min-w-[204px] invisible">선택된 기술 스택</dt>
              <dd>
                <ul className={"techTags"}>
                  {selectedTechTag.map(techName => (
                    <li
                      key={techName}
                      className={"techTag"}
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
                  `게시글 ${originPost ? "수정" : "작성"}을 취소하시겠습니까?`,
                )
              ) {
                navigate("/projectlist", { replace: true });
              }
            }}
          >
            취소
          </ActionButton>
          <ActionButton
            buttonType="submit"
            handleClick={handleSubmit(onSubmit)}
          >
            {originPost ? "게시글 수정하기" : "게시글 등록하기"}
          </ActionButton>
        </div>
      </form>
    </div>
  );
}

export default PostEditor;

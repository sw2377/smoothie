import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Hash } from "lucide-react";
import { UserCardListDataType } from "../../model/board.types";
import { useAppDispatch, useAppSelector } from "../../store/index";
import {
  addUserCard,
  modifiedUserCard,
} from "../../store/slices/userCardListSlice";

import ActionButton from "../UI/button/ActionButton";
import TextInput from "../UI/TextInput";
import TextTag from "../UI/TextTag";
import CardViewFront from "../UI/card/CardViewFront";
import CardViewBack from "../UI/card/CardViewBack";

import { session } from "../../app/supabase";
import { getProfile } from "../../store/slices/profileSlice";
import GetTechLogo from "../common/GetTechLogo";

interface CardEditorProps {
  originCard?: UserCardListDataType; // origin card가 있으면 수정, 없으면 생성
}

function CardEditor({ originCard }: CardEditorProps) {
  console.log("🔖 ORIGIN CARD", originCard);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user_id = session?.user.user_metadata.sub;

  const { data: userProfile } = useAppSelector(state => state.profiles);

  useEffect(() => {
    if (user_id) {
      dispatch(getProfile(user_id));
    }
  }, [dispatch]);

  /** 제목 */
  const [title, setTitle] = useState("");

  /** 작성일 */
  const createdDate = originCard?.created_at || new Date();

  /** 포지션 */
  const position = userProfile?.position;

  /** 기술스택: 내가 등록한 기술스택만 노출 */
  const myTechTags = userProfile?.tech_tags;
  const [selectedTechTags, setSelectedTechTags] = useState<string[]>([]);
  console.log("selectedTechTags", selectedTechTags);

  /** 키워드 */
  const [keywords, setKeywords] = useState<string[]>([]);

  // 키워드추가
  const addKeyword = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X

    // 같은 키워드 추가 금지
    if (!keywords.includes(trimKeyword)) {
      setKeywords(prev => {
        return [...prev, trimKeyword];
      });
    }
  };

  // 키워드 삭제
  const removeKeyword = (targetKeyword: string) => {
    const updatedKeyword = keywords.filter(
      keyword => keyword !== targetKeyword,
    );
    setKeywords(updatedKeyword);
  };

  useEffect(() => {
    if (originCard) {
      setTitle(originCard.title);
      setKeywords(originCard.keywords);
    }
  }, [originCard]);

  const cardData = {
    title,
    position,
    keywords,
    tech_tags: selectedTechTags,
    created_at: createdDate,
    user_name: session?.user.user_metadata.user_name,
    avatar_url: session?.user.user_metadata.avatar_url,
  };

  // 모든 입력값이 채워졌는지 확인 // 임시
  const isFieldFilled = () => {
    const checkTitle = title.trim().length === 0;
    const checkKeywords = keywords.length === 0;

    if (checkTitle || checkKeywords) {
      return false;
    }

    return true;
  };

  /** ADD & MODIFIED */
  const handleActionBtnClick = async () => {
    const reqData = {
      title,
      position,
      keywords,
      tech_tags: selectedTechTags,
      user_name: session?.user.user_metadata.user_name,
      avatar_url: session?.user.user_metadata.avatar_url,
    };

    console.log("🔖 REQ DATA", reqData);

    if (!isFieldFilled()) {
      alert("제목과 키워드를 모두 입력해주세요.");
      return;
    }

    if (
      window.confirm(
        originCard
          ? "카드를 수정하시겠습니까?"
          : "새로운 카드를 작성하시겠습니까?",
      )
    ) {
      // 카드 작성
      if (!originCard) {
        dispatch(addUserCard(reqData))
          .unwrap()
          .then(() => {
            alert("새 카드가 등록되었습니다.");
            navigate("/usercardlist");
          })
          .catch(error => {
            console.warn("❌ ERROR : ADD USER CARD", error);
            alert(error.message);
          });
      }

      // 카드 수정
      if (originCard) {
        const targetId = originCard.id;
        dispatch(modifiedUserCard({ targetId, reqData }))
          .unwrap()
          .then(() => {
            alert("카드가 수정되었습니다.");
            navigate("/usercardlist");
          })
          .catch(error => {
            console.warn("❌ ERROR : UPDATE USER CARD", error);
            alert(error);
          });
      }
    }
  };

  return (
    <main>
      <div className="flex flex-col gap-5 w-full">
        {/* Card Preview Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 pb-8 border-dotted border-b border-gray_3">
          <CardViewFront
            type="USER_CARD"
            cardData={cardData}
            isPreview={true}
          />
          <CardViewBack cardData={cardData} isPreview={true} />
        </div>

        {/* Input Area */}
        <div className="flex flex-col self-center w-full max-w-[800px] gap-10">
          {/* 제목 */}
          <div className="border-b border-gray_4">
            <h3 className="text-lg font-bold blind">제목</h3>
            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              className="w-full border-none pl-0 text-lg font-bold placeholder:text-lg placeholder:font-bold"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* 포지션 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">지금 나의 포지션은?</h3>
            {position ? (
              <p>{position}</p>
            ) : (
              <div className="text-error">
                <p>
                  😮 현재 등록된 포지션 없습니다. <br />
                  <Link
                    className="font-bold text-lg underline"
                    to={`/mypage/${user_id}/myInfo`}
                  >
                    마이페이지
                  </Link>
                  에서 나의 포지션을 등록해 주세요!
                </p>
              </div>
            )}
          </div>

          {/* 기술스택 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">
              카드에 등록할 나의 기술스택을 선택해 주세요.
            </h3>
            {myTechTags ? (
              <ul className="flex flex-wrap gap-2">
                {myTechTags.map(list => (
                  <li
                    key={list}
                    className={`flex flex-col items-center ${selectedTechTags.includes(list) ? "opacity-30 rounded-full" : ""}`}
                    onClick={() => {
                      if (!selectedTechTags) {
                        return setSelectedTechTags([list]);
                      }

                      if (selectedTechTags) {
                        // 이미 선택된 태그를 다시 선택하면 삭제
                        if (selectedTechTags.includes(list)) {
                          const newSelectedTechTags = selectedTechTags.filter(
                            techTag => techTag !== list,
                          );
                          return setSelectedTechTags(newSelectedTechTags);
                        }

                        // 태그 추가
                        return setSelectedTechTags(prev => [...prev, list]);
                      }
                    }}
                  >
                    <GetTechLogo logoTitle={list} style="w-10 h-10" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-error">
                <p>
                  😮 현재 등록된 기술스택이 없습니다. <br />
                  <Link
                    className="font-bold text-lg underline"
                    to={`/mypage/${user_id}`}
                  >
                    마이페이지
                  </Link>
                  에서 나의 기술스택을 추가해 주세요!
                </p>
              </div>
            )}
          </div>

          {/* 키워드 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">
              나를 표현하는 키워드를 입력해 주세요!
            </h3>
            <TextInput
              placeholder="Enter를 눌러 키워드를 추가할 수 있습니다."
              onSubmit={keyword => addKeyword(keyword)}
            >
              <Hash color="#BDBDBD" />
            </TextInput>
            <ul className="flex flex-wrap gap-2">
              {keywords.map(list => (
                <TextTag key={list} text={list} onDelete={removeKeyword} />
              ))}
            </ul>
          </div>
        </div>

        {/* Button Area */}
        <div className="flex gap-2 justify-end">
          <ActionButton
            type="outline"
            handleClick={() => {
              if (
                window.confirm(
                  `카드 ${originCard ? "수정" : "작성"}을 취소하시겠습니까?`,
                )
              ) {
                navigate("/usercardlist", { replace: true });
              }
            }}
          >
            취소
          </ActionButton>
          <ActionButton handleClick={handleActionBtnClick}>
            {originCard ? "카드 수정하기" : "카드 등록하기"}
          </ActionButton>
        </div>
      </div>
    </main>
  );
}

export default CardEditor;

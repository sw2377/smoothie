import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hash } from "lucide-react";
import { UserCardListDataType } from "../../model/board.types";
import { useAppDispatch } from "../../store/index";
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

interface CardEditorProps {
  originCard?: UserCardListDataType; // origin card가 있으면 수정, 없으면 생성
}

function CardEditor({ originCard }: CardEditorProps) {
  console.log("🔖 ORIGIN CARD", originCard);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /** 제목 */
  const [title, setTitle] = useState("");

  /** 작성일 */
  const createdDate = originCard?.created_at || new Date();

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
    position: "프론트엔드", // 임시
    keywords,
    techTags: ["13:JavaScript", "14:TypeScript", "15:React"], // 임시,
    createdAt: createdDate,
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
      position: "프론트엔드", // 임시
      keywords,
      tech_tags: ["13:JavaScript", "14:TypeScript", "15:React"], // 임시
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
        {/* Preview Area */}
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hash } from "lucide-react";

import ActionButton from "../UI/button/ActionButton";
import TextInput from "../UI/TextInput";
import TextTag from "../UI/TextTag";
import CardViewFront from "../UI/card/CardViewFront";
import CardViewBack from "../UI/card/CardViewBack";

// import { supabase } from "../../app/supabase";

function CardEditor() {
  const navigate = useNavigate();

  /** 제목 */
  const [title, setTitle] = useState("");

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

  const cardData = {
    // id: 1, // 임시
    title,
    position: "프론트엔드", // 임시
    keywords,
    // createdAt: Date.now, // 임시
    // modifiedAt: Date.now, // 임시
    techTags: ["13:JavaScript", "14:TypeScript", "15:React"], // 임시
    // userId: 11, // 임시
  };

  const handleSubmit = async () => {
    console.log("🚀 CREATE USER CARD");
    console.log(cardData);

    // const { error } = await supabase.from("userlist").insert(cardData);
    // console.log("ERROR", error);
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
              if (window.confirm("카드 작성을 취소하시겠습니까?")) {
                navigate("/userlist");
              }
            }}
          >
            취소
          </ActionButton>
          <ActionButton handleClick={handleSubmit}>
            {/* {originCard ? "카드 수정하기" : "카드 등록하기"} */}
            카드 등록하기
          </ActionButton>
        </div>
      </div>
    </main>
  );
}

export default CardEditor;

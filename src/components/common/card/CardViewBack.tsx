import { useNavigate } from "react-router-dom";

import { UserListDataType } from "../../../model/board.types";

interface CardViewBackProps {
  cardData: UserListDataType;
}

export default function CardViewBack({ cardData }: CardViewBackProps) {
  const { userListId, keywords, accountId, nickname, userImageUrl } = cardData;
  const navigate = useNavigate();

  // const tokenId = getTokenInfo();
  const tokenId = "abcd";

  const goToUserMyPage = () => {
    if (tokenId) {
      navigate(`/mypage/${accountId}`);
    } else {
      alert("회원만 다른 유저의 프로필을 조회할 수 있어요!");
      navigate("/login");
    }
  };

  return (
    <div className="back">
      <div className="topArea">
        {/* {tokenId === accountId ? (
          <span
            className="edit"
            onClick={() => {
              navigate(`/userlist/edit/${userListId}`);
            }}
          >
            <EditSvg width="24" height="24" />
          </span>
        ) : null} */}
      </div>
      <div className="centerArea">
        <div className="userImage" onClick={goToUserMyPage}>
          <img src={userImageUrl} alt="" />
        </div>
        <div className="keywordTag">
          {keywords.map(item => (
            <span key={item}>&nbsp;#{item}</span>
          ))}
        </div>
      </div>
      <div className="bottomArea">
        <div className="infoText">
          <span className="nickname">{nickname}</span>님이 더 궁금하신가요?
          <br />
          프로필 사진을 클릭해 보세요!
        </div>
      </div>
    </div>
  );
}

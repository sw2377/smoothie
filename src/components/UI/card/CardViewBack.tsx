import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { UserListDataType } from "../../../model/board.types";

interface CardViewBackProps {
  cardData: UserListDataType;
}

function CardViewBack({ cardData }: CardViewBackProps) {
  const { userListId, keywords, accountId, nickname, userImageUrl } = cardData;
  const navigate = useNavigate();

  // const tokenId = getTokenInfo();
  const tokenId = 1;

  const goToUserMyPage = () => {
    if (tokenId) {
      navigate(`/mypage/${accountId}`);
    } else {
      alert("회원만 다른 유저의 프로필을 조회할 수 있어요!");
      navigate("/login");
    }
  };

  return (
    <div className="card-front-back bg-[linear-gradient(-12deg,_#FFFBEA_50%,_#fff_50%)] backface-hidden rotate-y-180">
      <div className="flex justify-end h-6">
        {tokenId === accountId ? (
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate(`/userlist/edit/${userListId}`);
            }}
          >
            <Pencil color="#828282" />
          </span>
        ) : null}
      </div>
      <div className="mb-auto">
        <div
          className="overflow-hidden w-[85px] h-[85px] my-0 mx-auto rounded-full cursor-pointer border bg-default-profile bg-no-repeat bg-cover"
          onClick={goToUserMyPage}
        >
          <img src={userImageUrl} alt="" />
        </div>
        <div className="display-clamp mt-5">
          {keywords.map(item => (
            <span key={item} className="text-lg font-bold">
              &nbsp;#{item}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xxs text-center text-gray_3">
          <span className="font-bold text-xs">{nickname}</span>님이 더
          궁금하신가요?
          <br />
          프로필 사진을 클릭해 보세요!
        </div>
      </div>
    </div>
  );
}

export default CardViewBack;

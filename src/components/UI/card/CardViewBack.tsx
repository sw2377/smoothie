import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { Pencil } from "lucide-react";
import { UserCardListDataType } from "../../../model/board.types";
import profileDefaultImg from "../../../assets/profile-default.svg?react";

import { session } from "../../../app/supabase";

interface CardViewBackProps {
  cardData: UserCardListDataType;
  isPreview?: boolean;
}

function CardViewBack({ cardData, isPreview = false }: CardViewBackProps) {
  const { isLoggedIn } = useAppSelector(state => state.auth);

  const { id, keywords, user_id, user_name, avatar_url } = cardData;
  const navigate = useNavigate();

  const handleUserImageClick = () => {
    if (isLoggedIn) {
      navigate(`/mypage/${user_id}`);
    } else {
      window.alert("회원만 다른 유저의 프로필을 조회할 수 있어요!");
      navigate("/login");
    }
  };

  return (
    <div
      className={`${isPreview ? "w-[282px] h-[348px]" : "absolute top-0 left-0 w-full h-full rotate-y-180"} card-front-back bg-[linear-gradient(-12deg,_#FFFBEA_50%,_#fff_50%)] backface-hidden`}
    >
      <div className="flex justify-end h-6">
        {session?.user.id === user_id ? (
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate(`/usercardlist/edit/${id}`);
            }}
          >
            <Pencil color="#828282" />
          </span>
        ) : null}
      </div>
      <div className="mb-auto">
        <div
          className="overflow-hidden w-[85px] h-[85px] my-0 mx-auto rounded-full cursor-pointer border bg-default-profile bg-no-repeat bg-cover"
          onClick={handleUserImageClick}
        >
          <img src={avatar_url} alt={`${user_name} 님의 profile`} />
          {/* <img src={profileDefaultImg} alt={`${user_name} 님의 profile`} /> */}
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
          <span className="font-bold text-xs">{user_name}</span>
          님이 더 궁금하신가요?
          <br />
          프로필 사진을 클릭해 보세요!
        </div>
      </div>
    </div>
  );
}

export default CardViewBack;

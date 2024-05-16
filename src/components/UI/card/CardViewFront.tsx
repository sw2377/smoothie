import {
  ProjectCardListDataType,
  UserCardListDataType,
} from "../../../model/board.types";
import { CardType, CardDataType } from "../../../model/card.types";
import { extractTextAfterColon } from "../../../utils/exceptColonFromTechResponse";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import GetTechLogo from "../../common/GetTechLogo";

interface CardViewFrontProps {
  type: CardType;
  cardData: CardDataType;
  isPreview?: boolean;
}

function CardViewFront({
  type,
  cardData,
  isPreview = false,
}: CardViewFrontProps) {
  const isProjectCard = type === "PROJECT_CARD";
  const isUserCard = type === "USER_CARD";

  // console.log("🔖 cardData", cardData);
  const { title, position, created_at, tech_tags } =
    cardData as UserCardListDataType;
  const { status, user_name } = cardData as ProjectCardListDataType;

  const date = new Date(created_at).toLocaleDateString();
  const techTagNames = extractTextAfterColon(tech_tags);

  let statusText;
  if (status === "모집중") statusText = "모집중";
  else statusText = "모집완료";

  return (
    <div
      className={`${isPreview ? "w-[282px] h-[348px]" : "absolute top-0 left-0 w-full h-full"} card-front-back bg-[linear-gradient(-12deg,_#fff_50%,_#FFFBEA_50%)] backface-hidden`}
    >
      <div>
        <div className="flex justify-between">
          <span className="text-xs">{date}</span>
          {/* {isProjectCard && <span className="text-xs">조회수 {views}</span>} */}
        </div>
        {isProjectCard && (
          <div className="inline-block px-3 py-1 text-white bg-primary text-xxs rounded-[20px]">
            {statusText}
          </div>
        )}
      </div>
      <div className={`mt-6 mb-auto ${isUserCard ? "mt-8" : ""}`}>
        {isProjectCard && <span className="text-xs">{user_name}</span>}
        <div className="display-clamp text-xl font-bold">{title}</div>
      </div>
      <div onClick={e => e.stopPropagation()}>
        {/* position */}
        {position === null && (
          <div className="my-2 text-error">❌ 포지션을 등록해 주세요.</div>
        )}
        {typeof position === "string" && <div>{position}</div>}
        {Array.isArray(position) && <div>{position.join(", ")}</div>}

        {/* tech tags */}
        {tech_tags.length === 0 ? (
          <div className="my-2 text-error">
            ❌ 나의 기술 스택을 등록해 주세요.
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            freeMode={true}
            className="flex mt-3 min-h-10 text-sm"
          >
            {techTagNames?.map(techName => (
              <SwiperSlide
                key={techName}
                className="overflow-hidden !w-[32px] !h-[32px]"
              >
                <GetTechLogo logoTitle={techName} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default CardViewFront;

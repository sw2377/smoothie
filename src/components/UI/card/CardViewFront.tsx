import {
  ProjectListDataType,
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

  const { title, position, createdAt, techTags } =
    cardData as UserCardListDataType;
  const { views, status, writerNickName } = cardData as ProjectListDataType;

  const date = new Date(createdAt).toLocaleDateString();
  const techTagNames = extractTextAfterColon(techTags);

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
          {isProjectCard && <span className="text-xs">조회수 {views}</span>}
        </div>
        {isProjectCard && (
          <div className="inline-block px-3 py-1 text-white bg-primary text-xxs rounded-[20px]">
            {statusText}
          </div>
        )}
      </div>
      <div className={`mt-6 mb-auto ${isUserCard ? "mt-8" : ""}`}>
        {isProjectCard && <span className="text-xs">{writerNickName}</span>}
        <div className="display-clamp text-xl font-bold">{title}</div>
      </div>
      <div onClick={e => e.stopPropagation()}>
        {typeof position === "string" && <div>{position}</div>}
        {Array.isArray(position) && <div>{position.join(", ")}</div>}
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
      </div>
    </div>
  );
}

export default CardViewFront;

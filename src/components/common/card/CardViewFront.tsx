import {
  ProjectListDataType,
  UserListDataType,
} from "../../../model/board.types";
import { CardType, CardDataType } from "../../../model/card.types";
import { extractTextAfterColon } from "../../../utils/exceptColonFromTechResponse";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface CardViewFrontProps {
  type: CardType;
  cardData: CardDataType;
}

export default function CardViewFront({ type, cardData }: CardViewFrontProps) {
  const isProjectCard = type === "PROJECT_CARD";
  const isUserCard = type === "USER_CARD";

  const { title, position, createdAt, techTagList } =
    cardData as UserListDataType;
  const { views, status, writerNickName } = cardData as ProjectListDataType;

  const date = new Date(createdAt).toLocaleDateString();
  const techTagNames = extractTextAfterColon(techTagList);

  let statusText;
  if (status === "모집중") statusText = "모집중";
  else statusText = "모집완료";

  return (
    <div className="card-front-back bg-[linear-gradient(-12deg,_#fff_50%,_#FFFBEA_50%)] backface-hidden">
      <div>
        <div className="flex justify-between">
          <span className="text-xs">{date}</span>
          {isProjectCard && <span className="text-xs">조회수 {views}</span>}
        </div>
        {isProjectCard && (
          <div className="px-3 py-1 text-white bg-primary text-[0.625rem] rounded-[20px]">
            {statusText}
          </div>
        )}
      </div>
      <div className={`mt-6 mb-auto ${isUserCard ? "mt-8" : ""}`}>
        {isProjectCard && <span className="text-xs">{writerNickName}</span>}
        <div className="display-clamp text-xl font-bold">{title}</div>
      </div>
      <div onClick={e => e.stopPropagation()}>
        <div className="text-lg">{position}</div>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          freeMode={true}
          className="flex"
        >
          {techTagNames?.map(techName => (
            <SwiperSlide key={techName} className={"techTag"}>
              {techName}
              {/* <GetLogo logoTitle={techName} /> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

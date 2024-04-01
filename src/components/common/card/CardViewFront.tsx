import { CardType, CardDataType } from "../../../model/card.types";

interface CardViewFrontProps {
  type: CardType;
  cardData: CardDataType;
}

export default function CardViewFront({ type, cardData }: CardViewFrontProps) {
  const isProjectCard = type === "PROJECT_CARD";
  console.log(isProjectCard);

  const {
    title,
    position,
    // createdAt,
    // views,
    // status,
    // writerNickName,
    techTagList,
  } = cardData;

  return (
    <div className="card-front-back bg-[linear-gradient(-12deg,_#fff_50%,_#FFFBEA_50%)] backface-hidden">
      <div className="topArea">
        <div className="meta">
          {/* <span className="{date}">{createdAt}</span> */}
          {/* {isProjectCard && <span className="{view}">조회수 {views}</span>} */}
        </div>
        {/* {isProjectCard && <div className="{recruitTag}">{statusText}</div>} */}
      </div>
      <div className="{centerArea}">
        {/* {isProjectCard && <span className="{username}">{writerNickName}</span>} */}
        <div className="{title}">{title}</div>
      </div>
      <div className="{bottomArea}" onClick={e => e.stopPropagation()}>
        <div className="{position}">{position}</div>
        {/* 기술스택 */}
        <div>
          {techTagList.map(list => (
            <div>{list}</div>
          ))}
        </div>
        {/* <Swiper
          slidesPerView={5}
          spaceBetween={10}
          freeMode={true}
          className={techTags}
        >
          {techTagNames?.map(techName => (
            <SwiperSlide key={techName} className={techTag}>
              <GetLogo logoTitle={techName} />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </div>
  );
}

import CardViewBack from "./CardViewBack";
import CardViewFront from "./CardViewFront";
import { CardType, CardDataType } from "../../../model/card.types";
import { UserListDataType } from "../../../model/board.types";

interface CardViewProps {
  type: CardType;
  cardData: CardDataType;
}

export default function CardView({ type, cardData }: CardViewProps) {
  const isUserCard = type === "USER_CARD";

  return (
    <li className="group h-[348px] [perspective:1100px]">
      <div
        className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${isUserCard ? "group-hover:rotate-y-180" : "cursor-pointer"}`}
      >
        <CardViewFront type={type} cardData={cardData} />
        {isUserCard && <CardViewBack cardData={cardData as UserListDataType} />}
      </div>
    </li>
  );
}

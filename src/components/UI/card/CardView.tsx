import { useNavigate } from "react-router-dom";
import CardViewBack from "./CardViewBack";
import CardViewFront from "./CardViewFront";
import { CardType, CardDataType } from "../../../model/card.types";
import {
  UserCardListDataType,
  ProjectCardListDataType,
} from "../../../model/board.types";

interface CardViewProps {
  type: CardType;
  cardData: CardDataType;
  handleClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function CardView({ type, cardData, handleClick }: CardViewProps) {
  const isUserCard = type === "USER_CARD";
  const { id } = cardData as ProjectCardListDataType;

  const navigate = useNavigate();

  // console.log("🔖 CARD DATA", cardData);

  return (
    <li className="group h-[348px] [perspective:1100px]" onClick={handleClick}>
      <div
        className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${isUserCard ? "group-hover:rotate-y-180" : "cursor-pointer"}`}
        onClick={isUserCard ? undefined : () => navigate(`/projectlist/${id}`)}
      >
        <CardViewFront type={type} cardData={cardData} />
        {isUserCard && (
          <CardViewBack cardData={cardData as UserCardListDataType} />
        )}
      </div>
    </li>
  );
}

export default CardView;

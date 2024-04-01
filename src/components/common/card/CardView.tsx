import CardViewBack from "./CardViewBack";
import CardViewFront from "./CardViewFront";
import { CardType, CardDataType } from "../../../model/card.types";

interface CardViewProps {
  type: CardType;
  cardData: CardDataType;
}

export default function CardView({ type, cardData }: CardViewProps) {
  const isUserCard = type === "USER_CARD";

  return (
    <div>
      <CardViewFront type={type} cardData={cardData} />
      {isUserCard && <CardViewBack cardData={cardData} />}
    </div>
  );
}

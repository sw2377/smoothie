import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { UserListDataType } from "../../model/board.types";

import CardEditor from "../../components/userlist/CardEditor";

function EditCard() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const userCardData = useAppSelector(state => state.users?.data);
  const [originCard, setOriginCard] = useState<UserListDataType | null>(null);

  useEffect(() => {
    const targetCard = userCardData.find(usercard => usercard.id === +id);

    if (targetCard) {
      setOriginCard(targetCard);
    } else {
      alert("존재하지 않는 카드입니다.");
      navigate("/userlist", { replace: true });
    }
  }, [id, navigate, userCardData]);

  return <>{originCard && <CardEditor originCard={originCard} />}</>;
}

export default EditCard;

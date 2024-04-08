import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchUserCardList } from "../../store/slices/userCardListSlice";
import CardView from "../../components/UI/card/CardView";
import ActionButton from "../../components/UI/button/ActionButton";

import { session } from "../../app/supabase";

function UserCardList() {
  const { data: userCardData, isLoading } = useAppSelector(
    state => state.usercards,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /** FETCH 모든 유저 카드 조회 */
  useEffect(() => {
    console.log("🚀 GET USER CARD LIST");

    dispatch(fetchUserCardList());
  }, [dispatch]);

  const handleCreateCardBtnClick = () => {
    if (session === null) {
      window.alert("회원만 카드를 작성할 수 있어요!");
      navigate("/login");
    } else {
      navigate("/usercardlist/new");
    }
  };

  let contents;
  if (isLoading) {
    contents = <div>Loading...</div>;
  } else {
    contents = (
      <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {userCardData.map(card => (
          <CardView key={card.id} type="USER_CARD" cardData={card} />
        ))}
      </ul>
    );
  }

  return (
    <main>
      <div className="flex flex-col gap-5 w-full">
        <ActionButton style="self-end" handleClick={handleCreateCardBtnClick}>
          카드 작성하기
        </ActionButton>
        {contents}
      </div>
    </main>
  );
}

export default UserCardList;

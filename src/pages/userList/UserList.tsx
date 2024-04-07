import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchUserCardList } from "../../store/slices/userListSlice";
import CardView from "../../components/UI/card/CardView";
import ActionButton from "../../components/UI/button/ActionButton";

import { session } from "../../app/supabase";

function UserList() {
  const userCardData = useAppSelector(state => state.users?.data);
  console.log(userCardData);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  /** FETCH 모든 유저 카드 조회 */
  useEffect(() => {
    console.log("🚀 GET USER LIST");

    // dispatch(fetchUserCardList());
    dispatch(fetchUserCardList())
      .unwrap()
      .then(payload => console.log("fulfilled", payload))
      .catch(err => {
        console.warn("🚀 GET USERLIST ERROR: rejected ", err.message);
      });
  }, []);

  const handleCreateCardBtnClick = () => {
    console.log("🚀 handleCreateCardBtnClick");

    if (session === null) {
      window.alert("회원만 카드를 작성할 수 있어요!");
      navigate("/login");
    } else {
      navigate("/userlist/new");
    }
  };

  return (
    <main>
      <div className="flex flex-col gap-5 w-full">
        <ActionButton style="self-end" handleClick={handleCreateCardBtnClick}>
          카드 작성하기
        </ActionButton>
        <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {userCardData.map(card => (
            <CardView key={card.id} type="USER_CARD" cardData={card} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default UserList;

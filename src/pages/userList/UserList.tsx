import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";

import { fetchUserCardList } from "../../store/slices/userListSlice";
import CardView from "../../components/common/card/CardView";

function UserList() {
  const userCardData = useAppSelector(state => state.users?.data);
  console.log("userCardData", userCardData);
  const dispatch = useAppDispatch();

  /** FETCH 모든 유저 카드 조회 */
  useEffect(() => {
    getUserCards();
  }, []);

  const getUserCards = () => {
    console.log("🚀 GET USER LIST");

    dispatch(fetchUserCardList())
      .unwrap()
      .catch(err => {
        console.warn("🚀 GET USERLIST ERROR: ", err.message);
      });
  };

  return (
    <main>
      <ul className="grid grid-cols-4 place-items-center gap-y-6 gap-x-6 w-full mb-auto">
        {userCardData.map(card => (
          <CardView key={card.userListId} type="USER_CARD" cardData={card} />
        ))}
      </ul>
    </main>
  );
}

export default UserList;

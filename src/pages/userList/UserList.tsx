import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchUserCardList } from "../../store/slices/userListSlice";
import CardView from "../../components/UI/card/CardView";

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
      <div className="flex flex-col w-full">
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

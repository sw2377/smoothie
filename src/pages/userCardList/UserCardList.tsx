import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchUserCardList } from "../../store/slices/userCardListSlice";
import CardView from "../../components/UI/card/CardView";
import ActionButton from "../../components/UI/button/ActionButton";
import Loading from "../../components/common/Loading";

function UserCardList() {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { data: userCardData, isLoading } = useAppSelector(
    state => state.usercards,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /** FETCH 모든 유저 카드 조회 */
  useEffect(() => {
    dispatch(fetchUserCardList());
  }, [dispatch]);

  const handleCreateCardBtnClick = () => {
    if (isLoggedIn) {
      navigate("/usercardlist/new");
    } else {
      window.alert("회원만 카드를 작성할 수 있어요!");
      navigate("/login");
    }
  };

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <ActionButton style="self-end" handleClick={handleCreateCardBtnClick}>
          카드 작성하기
        </ActionButton>
        {isLoading && <Loading />}
        {userCardData.length === 0 && (
          <div className="flex items-center justify-center min-h-[500px]">
            아직 작성된 내용이 없어요!
          </div>
        )}
        {!isLoading && userCardData.length > 0 ? (
          <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {userCardData.map(card => (
              <CardView key={card.id} type="USER_CARD" cardData={card} />
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}

export default UserCardList;

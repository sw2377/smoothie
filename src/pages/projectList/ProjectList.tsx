import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchProjectCardList } from "../../store/slices/projectCardListSlice";
import CardView from "../../components/UI/card/CardView";
import ActionButton from "../../components/UI/button/ActionButton";

import { session } from "../../utils/supabase/getAuthInfo";
import Loading from "../../components/common/Loading";

function ProjectList() {
  const { data: projectData, isLoading } = useAppSelector(
    state => state.projectcards,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /** FETCH 모든 게시글 조회 */
  useEffect(() => {
    dispatch(fetchProjectCardList());
  }, [dispatch]);

  const handleCreateCardBtnClick = () => {
    if (session === null) {
      window.alert("회원만 카드를 작성할 수 있어요!");
      navigate("/login");
    } else {
      navigate("/projectlist/new");
    }
  };

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <ActionButton style="self-end" handleClick={handleCreateCardBtnClick}>
          카드 작성하기
        </ActionButton>
        {isLoading && <Loading />}
        {projectData.length === 0 && (
          <div className="flex items-center justify-center min-h-[500px]">
            아직 작성된 내용이 없어요!
          </div>
        )}
        {!isLoading && projectData.length > 0 ? (
          <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {projectData.map(card => (
              <CardView key={card.id} type="PROJECT_CARD" cardData={card} />
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}

export default ProjectList;

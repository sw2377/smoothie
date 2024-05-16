import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchProjectCardList } from "../../store/slices/projectCardListSlice";
import CardView from "../../components/UI/card/CardView";
import ActionButton from "../../components/UI/button/ActionButton";

import { session } from "../../app/supabase";

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

  let contents;
  if (isLoading) {
    contents = <div>Loading...</div>;
  } else {
    contents = (
      <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {projectData.map(card => (
          <CardView key={card.id} type="PROJECT_CARD" cardData={card} />
        ))}
      </ul>
    );
  }

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <ActionButton style="self-end" handleClick={handleCreateCardBtnClick}>
          카드 작성하기
        </ActionButton>
        {contents}
      </div>
    </main>
  );
}

export default ProjectList;

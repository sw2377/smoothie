import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProjectCardList } from "../../store/slices/projectCardListSlice";
import { fetchReviews } from "../../store/slices/reviewSlice";
import CardView from "../../components/UI/card/CardView";

import { session } from "../../app/supabase";

function Home() {
  console.log("HOME SESSION", session);

  const dispatch = useAppDispatch();

  // 📌 팀원모집카드, 리뷰 조회
  const { data: projectData } = useAppSelector(state => state.projectcards);
  const { data: reviewData } = useAppSelector(state => state.reviews);

  /** FETCH 모든 게시글 조회 */
  useEffect(() => {
    dispatch(fetchProjectCardList());
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* 메인배너 */}
      <section className="w-full h-[700px] bg-[#064C37]">
        <div className="max-w-[1200px] h-full mx-auto my-0 bg-primary">
          <h2>메인배너</h2>
        </div>
      </section>

      {/* 스무디소개 */}

      {/* 팀원모집카드 */}
      <section className="w-full h-[700px]">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20">
          <h3 className="text-3xl font-bold text-center pb-20">
            프로젝트를 함께할 팀원을 모집중이에요!
          </h3>
          <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {projectData.map(card => (
              <CardView key={card.id} type="PROJECT_CARD" cardData={card} />
            ))}
          </ul>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="w-full h-[700px]">
        <div className="h-full mx-auto my-0 py-20">
          <h3 className="text-3xl font-bold text-center pb-20">
            작성된 팀원 리뷰도 확인해 보세요!
          </h3>
          <ul className="flex gap-4">
            {reviewData?.map(review => (
              <li
                className="flex flex-col gap-4 justify-between w-[360px] h-fit min-h-40 p-8 border border-gray_4 rounded-[32px]"
                key={review.id}
              >
                <p>{review.content}</p>
                <span className="self-end">- 로시님의 팀원 리뷰</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;

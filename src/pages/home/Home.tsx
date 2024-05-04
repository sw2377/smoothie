import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getFourProjectCard } from "../../store/slices/projectCardListSlice";
import { fetchReviews } from "../../store/slices/reviewSlice";
import CardView from "../../components/UI/card/CardView";

import Illustrate1_SVG from "../../assets/images/illustrate-1.svg?react";
import Illustrate2_SVG from "../../assets/images/illustrate-2.svg?react";
import Illustrate3_SVG from "../../assets/images/illustrate-3.svg?react";
import Illustrate4_SVG from "../../assets/images/illustrate-4.svg?react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { session } from "../../app/supabase";

function Home() {
  console.log("HOME SESSION", session);

  const dispatch = useAppDispatch();

  // 📌 팀원모집카드, 리뷰 조회
  const { data: projectData } = useAppSelector(state => state.projectcards);
  const { data: reviewData } = useAppSelector(state => state.reviews);

  /** FETCH 모든 게시글 조회 */
  useEffect(() => {
    dispatch(getFourProjectCard());
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

      {/* 스무디소개 1 */}
      <section className="w-full">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
          <h3 className="text-3xl font-bold text-center pb-20">
            팀 프로젝트는 스무디와 함께!
          </h3>
          <ul className="flex flex-col gap-20 md:flex-row md:gap-6">
            <li className="flex flex-col items-center justify-between gap-4 md:w-1/3 md:h-[282px]">
              <div className="">
                <Illustrate1_SVG />
              </div>
              <div className="text-center font-bold">
                스무디에서 프로필 카드를 등록하고, <br />
                나를 홍보하세요!
              </div>
            </li>
            <li className="flex flex-col items-center justify-between gap-4 md:w-1/3 md:h-[282px]">
              <div className="">
                <Illustrate2_SVG />
              </div>
              <div className="text-center font-bold">
                사이드 프로젝트 팀원을 모집하고, <br />
                프로젝트에 참여해 보세요!
              </div>
            </li>
            <li className="flex flex-col items-center justify-between gap-4 md:w-1/3 md:h-[282px]">
              <div className="">
                <Illustrate3_SVG />
              </div>
              <div className="text-center font-bold">
                프로젝트와 팀원리뷰를 모아보고, <br />
                간편한 포트폴리오를 만들어보세요!
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 스무디소개 2 */}
      <section className="w-full bg-gray_5">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20">
          <div className="flex gap-10">
            <div className="border border-black w-1/2">카드섹션</div>
            <div className="flex flex-col items-center gap-4">글 섹션</div>
          </div>
        </div>
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20">
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-4">글 섹션</div>
            <div className="border border-black w-1/2">카드섹션</div>
          </div>
        </div>
      </section>

      {/* 팀원모집카드 */}
      <section className="w-full">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20">
          <h3 className="text-3xl font-bold text-center pb-20">
            프로젝트를 함께할 팀원을 모집중이에요!
          </h3>
          <Link
            to="/projectlist"
            className="flex gap-1 items-center justify-end mb-4 font-semibold hover:text-primary"
          >
            <span>더 보러가기</span>
            <ArrowRight width={16} height={16} />
          </Link>
          <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {projectData.map(card => (
              <CardView key={card.id} type="PROJECT_CARD" cardData={card} />
            ))}
          </ul>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="w-full">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20">
          <h3 className="text-3xl font-bold text-center pb-20">
            작성된 팀원 리뷰도 확인해 보세요!
          </h3>
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            modules={[Autoplay]}
          >
            {reviewData?.map(review => (
              <SwiperSlide
                className="flex flex-col gap-4 justify-between h-fit min-h-40 p-8 border border-gray_4 rounded-[32px]"
                key={review.id}
              >
                <p>{review.content}</p>
                <span className="self-end">
                  - {review.profiles.user_name} 님이 받은 팀원리뷰
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Home;

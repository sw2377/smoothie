import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getFourProjectCard } from "../../store/slices/projectCardListSlice";
import { fetchReviews } from "../../store/slices/reviewSlice";

import LogoKorean_SVG from "../../assets/logo-korean.svg?react";
import Illustrate1_SVG from "../../assets/images/illustrate-1.svg?react";
import Illustrate2_SVG from "../../assets/images/illustrate-2.svg?react";
import Illustrate3_SVG from "../../assets/images/illustrate-3.svg?react";
import Illustrate4_SVG from "../../assets/images/illustrate-4.svg?react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import CardViewFront from "../../components/UI/card/CardViewFront";
import CardViewBack from "../../components/UI/card/CardViewBack";
import CardView from "../../components/UI/card/CardView";

function Home() {
  const dispatch = useAppDispatch();

  // 📌 스무디 소개
  const intro_cardData = {
    title: `나와 잘 맞는 팀원과 함께하는 사이드 프로젝트 플랫폼, “스무디" 팀입니다.`,
    position: "프론트엔드",
    keywords: ["스무디", "프로필카드", "사이드프로젝트", "팀 프로젝트"],
    created_at: "2024.05.04",
    tech_tags: ["TypeScript", "React", "Redux", "Tailwind", "Supabase"],
    user_name: "스무디",
    avatar_url: "",
  };

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
      <section className="w-full h-[622px] bg-[#064C37] bg-no-repeat bg-[url(./assets/images/main-bg.png)] bg-left-top bg-cover">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
          <div className="flex items-center justify-between h-full">
            <div className="flex flex-col gap-6 min-w-fit">
              <h2 className="font-[Katuri] text-white text-7xl">
                Find Your <br />
                Perfect Team
              </h2>
              <p className="text-white text-xl font-bold leading-relaxed">
                사이드 프로젝트 부터 포트폴리오 까지 <br />
                함께하는 즐거움의 시작, 스무디
              </p>
              <Link to="/signup" className="block mt-10">
                <button className="overflow-hidden z-[1] relative bg-[#FFEAEF] text-black border-[#FFEAEF] rounded-3xl font-bold md:text-white md:bg-transparent hover:text-black after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-[-10%] after:h-full after:w-0 after:bg-[#FFEAEF] after:skew-x-[40deg] after:duration-500 hover:after:w-[120%]">
                  스무디와 함께하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 스무디소개 1 */}
      <section className="w-full">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
          <h3 className="flex justify-center items-center gap-2 text-3xl font-bold pb-20">
            <span>팀 프로젝트는</span>
            <span className="mb-4">
              <LogoKorean_SVG />
            </span>
            <span>와 함께!</span>
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
      <section className="w-full bg-[#F5F5F5]">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex gap-6">
              <div>
                <CardViewFront
                  type="USER_CARD"
                  cardData={intro_cardData}
                  isPreview={true}
                />
              </div>
              <div className="mt-12">
                <CardViewBack cardData={intro_cardData} isPreview={true} />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="font-bold text-2xl">
                나만의 프로필 카드를 만들어 나를 홍보해 보세요!
              </h4>
              <p className="text-xl text-center md:text-left">
                나를 표현하는 단어를 사용해 프로필 카드를 등록해 보세요. 다른
                유저의 프로필 카드를 확인하여 나와 잘 맞을 것 같은 팀원을 탐색해
                보세요.
              </p>
              <Link to="/signup" className="hidden mt-10 md:block">
                <button className="overflow-hidden z-[1] relative border-primary rounded-3xl text-primary font-bold hover:text-white after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-[-10%] after:h-full after:w-0 after:bg-primary after:skew-x-[40deg] after:duration-500 hover:after:w-[120%]">
                  스무디 시작하기
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4 order-2 md:order-1">
              <h4 className="font-bold text-2xl">
                프로젝트와 팀원리뷰를 모아보고, <br />
                간편한 포트폴리오를 만들어 보세요!
              </h4>
              <p className="text-xl text-center md:text-left">
                마이페이지에서 프로젝트를 등록하고, 진행한 프로젝트의 팀원리뷰를
                통해 포트폴리오를 간편하게 완성해 보세요. <br />
                나의 페이지 링크를 이력서에 첨부해 내가 진행한 프로젝트를 제출해
                보세요.
              </p>
              <Link to="/signup" className="hidden mt-10 md:block">
                <button className="rounded-3xl bg-primary border-primary text-white">
                  스무디 시작하기
                </button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Illustrate4_SVG />
            </div>
          </div>
        </div>
      </section>

      {/* 팀원모집카드 */}
      <section className="w-full">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
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
          {/* <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {projectData.map(card => (
              <CardView key={card.id} type="PROJECT_CARD" cardData={card} />
            ))}
          </ul> */}
          <Swiper
            spaceBetween={24}
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
                loop: false,
              },
            }}
            modules={[Autoplay]}
            className="p-1"
          >
            {projectData?.map(card => (
              <SwiperSlide key={card.id}>
                <CardView key={card.id} type="PROJECT_CARD" cardData={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="w-full">
        <div className="max-w-[1200px] h-full mx-auto my-0 py-20 px-6">
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
                loop: false,
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
                  - {review.profiles?.user_name} 님이 받은 팀원리뷰
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

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProjectCard } from "../../store/slices/projectCardListSlice";
import { extractTextAfterColon } from "../../utils/exceptColonFromTechResponse";
import { getStringDate } from "../../utils/formatDate";
import GetTechLogo from "../common/GetTechLogo";

import { session } from "../../app/supabase";

function PostContent() {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { currentData, isLoading } = useAppSelector(
    state => state.projectcards,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  /** GET 게시글 조회 */
  useEffect(() => {
    dispatch(getProjectCard(id));
  }, [dispatch, id]);

  const {
    title,
    content,
    position,
    tech_tags,
    created_at,
    start_date,
    end_date,
    user_id,
    user_name,
    avatar_url,
  } = currentData || {};

  const createdDateString = created_at && getStringDate(created_at);
  const startDateString = start_date && getStringDate(start_date);
  const endDateString = end_date && getStringDate(end_date);
  const techTagNames = extractTextAfterColon(tech_tags);

  const handleUserImageClick = (userId: number) => {
    if (isLoggedIn) {
      navigate(`/mypage/${userId}`);
    } else {
      window.alert("회원만 다른 유저의 프로필을 조회할 수 있어요!");
      navigate("/login");
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-4xl font-bold">{title}</h2>
          <div className="flex gap-3 items-center py-6 border-b border-gray_4">
            <div
              className="overflow-hidden w-[45px] h-[45px] rounded-full cursor-pointer bg-default-profile bg-no-repeat bg-cover"
              onClick={() => handleUserImageClick(user_id)}
            >
              <img src={avatar_url} alt={`${user_name}님의 Profile`} />
            </div>
            <div className="text-lg font-bold">{user_name}</div>
            <div className="text-lg before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:mr-3 before:mb-[2px] before:bg-gray_4 before:rounded-full">
              {createdDateString}
            </div>
            {session?.user.id === user_id ? (
              <span
                className="ml-auto cursor-pointer"
                onClick={() => {
                  navigate(`/projectlist/edit/${id}`);
                }}
              >
                <Pencil color="#828282" width={18} height={18} />
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-4 py-4 text-xl">
            <dl className="flex">
              <dt className="min-w-[204px]">프로젝트 예상기간</dt>
              <dd className="font-bold">
                {startDateString} ~ {endDateString}
              </dd>
            </dl>
            <dl className="flex">
              <dt className="min-w-[204px]">포지션 및 인원</dt>
              <dd className="font-bold">{position?.join(", ")}</dd>
            </dl>
            <dl className="flex">
              <dt className="min-w-[204px]">기술 스택</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {techTagNames?.map(techName => {
                    return (
                      <li key={techName} className="w-10 h-10">
                        <GetTechLogo logoTitle={techName} />
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </dl>
          </div>
          <div className="mt-8 mb-28">
            <h3 className="pb-6 mb-4 text-2xl border-b border-gray_4">
              프로젝트 소개
            </h3>
            <div
              className="quillEditor quillEditor_view"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          {/* {tokenId === writerId ? (
          <div className={"completeBtn"}>
            <button>팀원모집완료</button>
            <p>
              팀원 모집이 완료되었다면, 버튼을 클릭하여 모집 상태를 변경해 주세요!
            </p>
          </div>
        ) : null} */}
        </>
      )}
    </section>
  );
}

export default PostContent;

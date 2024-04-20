import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  filteredUserCardByUserId,
  removeUserCard,
} from "../../store/slices/userCardListSlice";
import CardView from "../../components/UI/card/CardView";
import {
  filteredProjectCardByUserId,
  removeProject,
} from "../../store/slices/projectListSlice";
import { getUser } from "../../app/supabase";
import SideMenu from "../../components/mypage/SideMenu";

function Summary() {
  const { data: userCardData } = useAppSelector(state => state.usercards);
  const { data: projectCardData } = useAppSelector(state => state.projects);
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const [isRemoveUserCardBtnActive, setIsRemoveUserCardBtnActive] =
    useState(false);
  const [isRemoveProjectCardBtnActive, setIsRemoveProjectCardBtnActive] =
    useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    getUser().then(data => {
      if (data?.id === id) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(filteredUserCardByUserId(id));
      dispatch(filteredProjectCardByUserId(id));
    }
  }, [dispatch, id]);

  const handleRemoveUserCardBtnClick = () => {
    setIsRemoveUserCardBtnActive(!isRemoveUserCardBtnActive);
  };

  const handleRemoveProjectCardBtnClick = () => {
    setIsRemoveProjectCardBtnActive(!isRemoveProjectCardBtnActive);
  };

  const handleRemoveUserCard = (targetId: string) => {
    if (
      isRemoveUserCardBtnActive &&
      window.confirm("카드를 정말 삭제하시겠습니까?")
    ) {
      dispatch(removeUserCard(targetId))
        .unwrap()
        .then(() => {
          alert("삭제되었습니다.");
        });
      // .catch(error => {
      //   console.warn(error);
      // });
    }
  };

  const handleRemoveProjectCard = (
    e: React.MouseEvent<HTMLLIElement>,
    targetId: string,
  ) => {
    e.stopPropagation();

    if (
      isRemoveProjectCardBtnActive &&
      window.confirm("카드를 정말 삭제하시겠습니까?")
    ) {
      dispatch(removeProject(targetId))
        .unwrap()
        .then(() => {
          alert("삭제되었습니다.");
        });
      // .catch(error => {
      //   console.warn(error);
      // });
    }
  };

  const [selectedMenu, setSelectedMenu] = useState("summary");

  return (
    <div className="flex flex-col md:flex-row">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <main className="w-full md:w-3/4 md:px-6 items-start">
        <div className="flex flex-col gap-16 w-full">
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold">유저카드 (저를 소개합니다)</h3>
              {isAuthor && (
                <button
                  className="border-none"
                  onClick={handleRemoveUserCardBtnClick}
                >
                  {isRemoveUserCardBtnActive ? (
                    <span className="text-[#EB5757] font-bold">
                      삭제할 카드를 선택해 주세요.
                    </span>
                  ) : (
                    <Trash2 className="text-gray_4 hover:text-black" />
                  )}
                </button>
              )}
            </div>
            {userCardData.length > 0 ? (
              <ul className="grid gap-6 mb-auto lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {userCardData.map(card => (
                  <CardView
                    key={card.id}
                    type="USER_CARD"
                    cardData={card}
                    handleClick={() =>
                      handleRemoveUserCard(card.id?.toString())
                    }
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col justify-center items-center h-[100px]">
                <div>아직 작성하신 카드가 없어요!</div>
              </div>
            )}
          </section>
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold">
                프로젝트 카드 (저는 이런 프로젝트를 기획했어요!)
              </h3>
              {isAuthor && (
                <button
                  className="border-none"
                  onClick={handleRemoveProjectCardBtnClick}
                >
                  {isRemoveProjectCardBtnActive ? (
                    <span className="text-[#EB5757] font-bold">
                      삭제할 카드를 선택해 주세요.
                    </span>
                  ) : (
                    <Trash2 className="text-gray_4 hover:text-black" />
                  )}
                </button>
              )}
            </div>
            {projectCardData.length > 0 ? (
              <ul className="grid gap-6 mb-auto lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {projectCardData.map(card => (
                  <CardView
                    key={card.id}
                    type="PROJECT_CARD"
                    cardData={card}
                    handleClick={e =>
                      handleRemoveProjectCard(e, card.id?.toString())
                    }
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col justify-center items-center h-[100px]">
                <div>아직 작성하신 카드가 없어요!</div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Summary;

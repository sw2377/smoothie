import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { fetchProjectList } from "../../store/slices/projectListSlice";
import CardView from "../../components/UI/card/CardView";

function ProjectList() {
  const projectListData = useAppSelector(state => state.projects?.data);
  const dispatch = useAppDispatch();

  /** FETCH 모든 게시글 조회 */
  useEffect(() => {
    getProjcetList();
  }, []);

  const getProjcetList = () => {
    console.log("🚀 GET PROJECT LIST");

    dispatch(fetchProjectList())
      .unwrap()
      .catch(err => {
        console.warn("🚀 GET PROJECT LIST ERROR: ", err.message);
      });
  };

  return (
    <main>
      <div className="flex flex-col w-full">
        <ul className="grid gap-6 mb-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {projectListData.map(card => (
            <CardView
              key={card.projectListId}
              type="PROJECT_CARD"
              cardData={card}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default ProjectList;

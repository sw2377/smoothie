import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { fetchProjectCardList } from "../../store/slices/projectCardListSlice";
// import PostComments from "../../components/projectList/PostComments";
import PostContent from "../../components/projectList/PostContent";

function ProjectDetail() {
  const dispatch = useAppDispatch();

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjectCardList())
      .unwrap()
      .then(data => {
        const cardListId = data.map(list => list.id.toString());

        if (!cardListId.includes(id)) {
          alert("존재하지 않는 글입니다.");
          navigate("/projectlist", { replace: true });
        }
      });
  }, [dispatch, id, navigate]);

  return (
    <main>
      <div className="w-full">
        <PostContent />
        {/* <PostComments /> */}
      </div>
    </main>
  );
}

export default ProjectDetail;

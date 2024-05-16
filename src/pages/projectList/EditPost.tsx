import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { ProjectCardListDataType } from "../../model/board.types";

import PostEditor from "../../components/projectList/PostEditor";

function EditPost() {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  const projectPostData = useAppSelector(state => state.projectcards.data);
  const [originPost, setOriginPost] = useState<ProjectCardListDataType | null>(
    null,
  );

  useEffect(() => {
    const targetPost = projectPostData.find(post => post.id === +id);

    if (targetPost) {
      setOriginPost(targetPost);
    } else {
      alert("존재하지 않는 글입니다.");
      navigate("/projectlist", { replace: true });
    }
  }, [id, navigate, projectPostData]);

  return <>{originPost && <PostEditor originPost={originPost} />}</>;
}

export default EditPost;

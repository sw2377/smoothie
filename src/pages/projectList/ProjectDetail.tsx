import PostComments from "../../components/projectList/PostComments";
import PostContent from "../../components/projectList/PostContent";

function ProjectDetail() {
  return (
    <main>
      <div className="w-full">
        <PostContent />
        <PostComments />
      </div>
    </main>
  );
}

export default ProjectDetail;

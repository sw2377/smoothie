import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

function HeaderRightSide() {
  const navigate = useNavigate();

  return (
    <div>
      <Button handleClick={() => navigate("/login")}>Log In</Button>
      <Button handleClick={() => navigate("/signup")}>Sign Up</Button>
    </div>
  );
}

export default HeaderRightSide;
